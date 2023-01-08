const { GeneralConrtller } = require("../generalController");
const Enrolment_Model = require("./model");

const getSingle = async (data) => {
  let gotData = await Enrolment_Model.findOne(data);
  if (gotData) {
    return gotData;
  } else {
    return false;
  }
};
const post = async (req, res) => {
  const { data } = req.body;
  if (await getSingle({ student: data?.student, course: data?.course })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Enrolment Already Enrolled",
      null,
      false
    );
  }
  let newCourse = new Enrolment_Model({
    student: data?.student,
    course: data?.course,
  });
  try {
    let createdSubject = await newCourse
      .save()
      .populate("student")
      .populate("course");
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Enrolment added Successfully",
      createdSubject,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const update = async (req, res) => {
  const { data } = req.body;
  if (
    await getSingle({
      student: data?.student,
      course: data?.course,
      _id: { $ne: data?._id },
    })
  ) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Enrolment Already Exist for Student",
      null,
      false
    );
  }

  try {
    let updated = await Enrolment_Model.findOneAndUpdate(
      {
        _id: data?._id,
      },
      { student: data?.student, course: data?.course },
      {
        new: true,
      }
    )
      .populate("student")
      .populate("course");
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Enrolment Updated Successfully",
      updated,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const get = async (req, res) => {
  let data = await Enrolment_Model.find()
    .populate("student")
    .populate("course");
  return GeneralConrtller.ResponseObj(
    res,
    data?.length > 0 ? 200 : 400,
    "Enrolments",
    data,
    data?.length > 0 ? true : false
  );
};

const deleteList = async (req, res) => {
  let data = await Enrolment_Model.deleteMany();
  return GeneralConrtller.ResponseObj(res, 200, "Enrolments Deleted", [], true);
};

const deleteSingle = async (req, res) => {
  let _id = req.params._id;
  let data = await Enrolment_Model.deleteOne({ _id: _id });
  return GeneralConrtller.ResponseObj(
    res,
    200,
    "Enrolment Deleted",
    data,
    true
  );
};

const getSingleEnrolment = async (req, res) => {
  let _id = req.params._id;
  let data = await Enrolment_Model.findOne({ _id: _id })
    .populate("student")
    .populate("course");
  return GeneralConrtller.ResponseObj(res, 200, "Enrolment", data, true);
};

const getStudentEnrolment = async (req, res) => {
  let studentId = req.params.studentId;
  let data = await Enrolment_Model.find({ student: studentId })
    .populate("student")
    .populate({
      path: "course",
      select: "_id courseCode title subjectId course",
      populate: { path: "subjectId", select: "_id name subCode" },
    });
  return GeneralConrtller.ResponseObj(
    res,
    data?.length > 0 ? 200 : 400,
    "Enrolments",
    data,
    data?.length > 0 ? true : false
  );
};

module.exports = {
  post,
  update,
  get,
  deleteList,
  deleteSingle,
  getSingleEnrolment,
  getStudentEnrolment,
};
