const res = require("express/lib/response");
const { IsCourseAttendeceOpen } = require("../Courses/courses");
const AttendenceModel = require("./model");

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
    if (data?.courseId) {
      let checkAttendence = await alreadyMarked({
        student: data?.studentId,
        course: data?.courseId,
      });
      if (checkAttendence) {
        return res
          .status(403)
          .json({ msg: "Attendence Marked", success: false });
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
        course: data?.courseId,
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
  let attendences = await AttendenceModel.find().populate(
    "student",
    "_id firstName lastName regNumber"
  );
  return res.status(200).json({
    msg: "Record",
    results: attendences,
    success: attendences?.length > 0 ? true : false,
  });
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
  deleteRecords,
};
