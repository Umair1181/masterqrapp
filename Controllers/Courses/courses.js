const { GeneralConrtller } = require("../generalController");
const Course_Model = require("./model");

const getSingle = async (data) => {
  let gotData = await Course_Model.findOne(data).lean();
  if (gotData) {
    return gotData;
  } else {
    return false;
  }
};
const post = async (req, res) => {
  const data = req.body;
  if (await getSingle({ title: data?.title })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Course Title Repeated",
      null,
      false
    );
  }
  if (await getSingle({ courseCode: data?.courseCode })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Course Code Repeated",
      null,
      false
    );
  }
  let newCourse = new Course_Model({
    title: data?.title,
    courseCode: data?.courseCode,
    subjectId: data?.subjectId,
    attendenceMarkingOpen: data?.attendenceMarkingOpen,
    qrCodeId: data?.qrCodeId,
    creditHours: data?.creditHours,
  });
  try {
    let createdSubject = await (
      await newCourse.save()
    ).populate("subjectId", "_id name subCode");
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Course added Successfully",
      createdSubject,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const update = async (req, res) => {
  let courseId = req.params._id;
  const data = req.body;
  if (await getSingle({ title: data?.title, _id: { $ne: courseId } })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Course Title Already Exist",
      null,
      false
    );
  }
  if (
    await getSingle({ courseCode: data?.courseCode, _id: { $ne: courseId } })
  ) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Course Code Already Exist",
      null,
      false
    );
  }

  let updateCourse = {};
  if (data?.title) {
    updateCourse = { title: data?.title };
  }
  if (data?.courseCode) {
    updateCourse = { ...updateCourse, courseCode: data?.courseCode };
  }
  if (data?.subjectId) {
    updateCourse = { ...updateCourse, subjectId: data?.subjectId };
  }
  if (data?.attendenceMarkingOpen) {
    updateCourse = { ...updateCourse, attendenceMarkingOpen: true };
  }
  if (!data?.attendenceMarkingOpen) {
    updateCourse = { ...updateCourse, attendenceMarkingOpen: false };
  }
  if (data?.qrCodeId) {
    updateCourse = { ...updateCourse, qrCodeId: data?.qrCodeId };
  }
  if (data?.creditHours) {
    updateCourse = { ...updateCourse, creditHours: data?.creditHours };
  }
  console.log("updateCourse: ", updateCourse);
  try {
    let updated = await Course_Model.findOneAndUpdate(
      {
        _id: courseId,
      },
      updateCourse,
      {
        new: true,
      }
    ).populate("subjectId", "_id name subCode");
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Course Updated Successfully",
      updated,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const updateAttendence = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    let find = await Course_Model.findOne({
      _id: courseId,
    });
    let updated = await Course_Model.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        attendenceMarkingOpen:
          find.attendenceMarkingOpen == true ? false : true,
      },
      {
        new: true,
      }
    ).populate("subjectId", "_id name subCode");
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Course Updated Successfully",
      updated,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const get = async (req, res) => {
  let data = await Course_Model.find().populate(
    "subjectId",
    "_id name subCode"
  );
  let total = await Course_Model.count();
  return GeneralConrtller.ResponseObj(
    res,
    data?.length > 0 ? 200 : 400,
    "Courses",
    data,
    data?.length > 0 ? true : false,
    total
  );
};

const deleteList = async (req, res) => {
  let data = await Course_Model.deleteMany();
  return GeneralConrtller.ResponseObj(res, 200, "Courses Deleted", [], true);
};

const deleteSingle = async (req, res) => {
  let _id = req.params._id;
  let data = await Course_Model.deleteOne({ _id: _id });
  return GeneralConrtller.ResponseObj(res, 200, "Course Deleted", data, true);
};

const getSingleCourse = async (req, res) => {
  let _id = req.params._id;
  let data = await Course_Model.findOne({ _id: _id }).populate(
    "subjectId",
    "_id name subCode"
  );
  return GeneralConrtller.ResponseObj(res, 200, "Course", data, true);
};

const IsCourseAttendeceOpen = async (_id) => {
  let resp = await Course_Model.findOne({
    _id: _id,
  });
  return resp?.attendenceMarkingOpen;
};

module.exports = {
  post,
  update,
  get,
  deleteList,
  deleteSingle,
  getSingle,
  getSingleCourse,
  updateAttendence,
  IsCourseAttendeceOpen,
};
