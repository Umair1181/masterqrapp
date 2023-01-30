const res = require("express/lib/response");
const moment = require("moment");
const { IsCourseAttendeceOpen } = require("../Courses/courses");
const AttendenceModel = require("./model");
const CourseController = require("../Courses/courses");
const EnrolmentController = require("../Enrolments/enrolments");
const EnrolmentModal = require("../Enrolments/model");
const MyAttendenceBusinessLogic = require("../../BusinessLogics/attendence");

const alreadyMarked = async (data) => {
  let isFound = await AttendenceModel.findOne(data);
  if (isFound) {
    return isFound;
  } else {
    return false;
  }
};

const AddAttendence = async (req, res) => {
  const data = req.body;
  // let checkAttendence = await alreadyMarked(data?.studentId)
  // if( checkAttendence ){
  //     return res.status(403).json({ msg: "Attendence already Marked", success: false })
  // }else{
  if (data?.studentId) {
    if (data?.qrCodeId) {
      // verifying qr to get Course Id
      let course = await CourseController.getSingle({
        qrCodeId: data?.qrCodeId,
      });
      console.log("course: ", course);
      if (!course) {
        // No course Means Invalid Qr Id
        return res.status(403).json({ msg: "Invalid Qr Scan", success: false });
      }

      let checkAttendence = await alreadyMarked({
        student: data?.studentId,
        course: course._id,
      });
      console.log("checkAttendence: ", checkAttendence);
      if (checkAttendence) {
        return res
          .status(403)
          .json({ msg: "Attendence Already Marked", success: true });
      }
      let isOpen = await IsCourseAttendeceOpen(data?.courseId);
      if (isOpen == false) {
        return res.json({
          msg: "Attendence Is Closed",
          success: false,
          results: null,
        });
      }
      let newAttendence = new AttendenceModel({
        student: data?.studentId,
        course: course?._id,
        markInDate: moment(new Date()).format("DD-MM-YYYY"),
      });
      let marked = await newAttendence.save();
      if (marked) {
        return res.json({
          msg: "Attendence Marked Successfully",
          success: true,
          results: marked,
        });
      } else {
        return res.json({
          msg: "Attendence Mark Failed",
          success: false,
          results: null,
        });
      }
    } else {
      return res.json({
        msg: "Invalid Course Id",
        success: false,
        results: null,
      });
    }
  } else {
    return res.json({ msg: "Invalid Student", success: false, results: null });
  }
  // }
};

const GetAttendences = async (req, res) => {
  console.log("With Course Id");
  if (!req.params._id) {
    return res
      .status(200)
      .json({ msg: "Course id required", success: true, results: false });
  }
  const courseId = req.params._id;
  let attendences = await AttendenceModel.find({
    course: courseId,
  }).populate("student", "_id firstName lastName regNumber");
  return res.status(200).json({
    msg: "Record",
    results: attendences,
    success: attendences?.length > 0 ? true : false,
  });
};

const GetAttendencesWithDate = async (req, res) => {
  console.log("With Course Id & date");

  if (!req.params._id) {
    return res
      .status(200)
      .json({ msg: "Course id required", success: true, results: false });
  }
  if (!req.params._date) {
    return res
      .status(200)
      .json({ msg: "Date Required", success: true, results: false });
  }
  const courseId = req.params._id;
  const _date = req.params._date;
  console.log({
    course: courseId,
    markInDate: _date,
  });
  let prepArray = [];
  // Pick The Students Of Course Whom Enroled In this Course
  let elroments = await EnrolmentModal.find({ course: courseId })
    .populate("student")
    .lean();
  console.log(elroments?.length);
  //Checking Marked Present true ot false for marked attendence person
  let checkMarkedPersons =
    await MyAttendenceBusinessLogic.CheckStudentMarkedAttendence(
      elroments,
      _date
    );
  return res.status(200).json({
    msg: "Record",
    results: checkMarkedPersons, // attendences,
    success: checkMarkedPersons?.length > 0 ? true : false,
  });
  // let attendences = await AttendenceModel.find({
  //   course: courseId,
  //   markInDate: _date,
  // }).populate("student", "_id firstName lastName regNumber");
};

const deleteRecords = async (req, res) => {
  let records = await AttendenceModel.deleteMany();

  return res
    .status(200)
    .json({ msg: "Removed Successfully", success: true, results: records });
};

module.exports = {
  AddAttendence,
  GetAttendences,
  GetAttendencesWithDate,
  deleteRecords,
};
