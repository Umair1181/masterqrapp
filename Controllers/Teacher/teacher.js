const res = require("express/lib/response");
const { TEACHER_PASS } = require("../consts");
const { GeneralConrtller } = require("../generalController");
const TeacherModel = require("./model");
const addTeacher = async (req, res) => {
  let file = req.file;
  console.log("req.files: ", req.files);
  console.log("req.file: ", req.file);

  if (!file) {
    return GeneralConrtller.ResponseObj(res, 409, "Image Missing", null, false);
  }
  let { data } = req.body;
  data = { ...JSON.parse(data) };
  let dimPass = TEACHER_PASS;

  let image = { url: `/image/${file?.filename}`, name: file?.originalname };

  let generatedPass = await GeneralConrtller.PrepPassword(dimPass);
  // checking repeated data
  if (await getSingle({ cnic: data?.cnic })) {
    return GeneralConrtller.ResponseObj(
      res,
      403,
      "Cnic is Repeated",
      null,
      false
    );
  }
  // generating Pasword with encyption
  if (!generatedPass) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Password Encryption Failed",
      null,
      false
    );
  }
  try {
    let _newTeacher = {};
    if (data?.firstName) {
      _newTeacher = { ..._newTeacher, firstName: data?.firstName };
    }
    if (data?.lastName) {
      _newTeacher = { ..._newTeacher, lastName: data?.lastName };
    }
    if (data?.cnic) {
      _newTeacher = { ..._newTeacher, cnic: data?.cnic };
    }
    if (data?.gender) {
      _newTeacher = { ..._newTeacher, gender: data?.gender };
    }
    if (data?.subjectId) {
      _newTeacher = { ..._newTeacher, subjectId: data?.subjectId };
    }
    if (image) {
      _newTeacher = { ..._newTeacher, image: image };
    }
    if (generatedPass) {
      _newTeacher = { ..._newTeacher, password: generatedPass };
    }
    let newTeacher = new TeacherModel(_newTeacher);
    let createdTeacher = await newTeacher.save();
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Teacher  added Successfully",
      createdTeacher,
      true
    );
  } catch (error) {
    console.log("error: ", error);
    return GeneralConrtller.ResponseObj(
      res,
      400,
      GeneralConrtller.handleError(error),
      error,
      false
    );
  }
};
const updateTeacher = async (req, res) => {
  const teacherId = req.params._id;
  const data = req.body;
  let toUpdate = {};
  if (data?.subjectId) {
    toUpdate = { subjectId: data?.subjectId };
  }
  if (data?.firstName) {
    toUpdate = { ...toUpdate, firstName: data?.firstName };
  }
  if (data?.lastName) {
    toUpdate = { ...toUpdate, lastName: data?.lastName };
  }
  if (data?.cnic) {
    toUpdate = { ...toUpdate, cnic: data?.cnic };
  }
  if (data?.gender) {
    toUpdate = { ...toUpdate, gender: data?.gender };
  }
  if (await getSingle({ cnic: data?.cnic, _id: { $ne: teacherId } })) {
    return res.status(200).json({
      msg: "Cnic Repeated",
      success: true,
      data: null, // gotData
    });
  }
  let gotData = await TeacherModel.findOneAndUpdate(
    {
      _id: teacherId,
    },
    toUpdate,
    {
      new: true,
    }
  )
    .populate("subjectId")
    .populate("courses");

  return res.status(200).json({
    msg: "Updated Successfully",
    success: true,
    data: gotData, // gotData
  });
};
const getSingle = async (data) => {
  let gotData = await TeacherModel.findOne(data);
  if (gotData) {
    return gotData;
  } else {
    return false;
  }
};

const allTeachers = async (req, res) => {
  let teachers = await TeacherModel.find()
    .populate("subjectId")
    .populate("courses");
  let total = await TeacherModel.count();
  return res.status(200).json({
    msg: "Teachers",
    success: teachers?.length > 0 ? true : false,
    results: teachers,
    total: total,
  });
};

const getSingleTeacher = async (req, res) => {
  const teacherId = req.params._id;
  if (teacherId) {
    let found = await TeacherModel.findOne({ _id: teacherId })
      .populate("courses")
      .populate("subjectId");
    if (found) {
      return res.status(200).json({
        msg: "Teacher Found",
        success: true,
        results: found,
        total: 1,
      });
    } else {
      return res.status(404).json({
        msg: "Teacher Not Found",
        success: false,
        results: null,
        total: 0,
      });
    }
  } else {
    return res.status(400).json({
      msg: "Invalid Id",
      success: false,
      results: null,
      total: 0,
    });
  }
};

const removeTeachers = async (req, res) => {
  let teachers = await TeacherModel.deleteMany();

  return res.status(200).json({
    msg: "Removed Successfully",
    success: true,
    data: teachers, // teachers
  });
};

const removeSingleTeacher = async (req, res) => {
  const teacherId = req.params.teacherId;
  let removedTeacher = await TeacherModel.deleteOne({ _id: teacherId });

  return res.status(200).json({
    msg: "Removed Successfully",
    success: true,
    data: removedTeacher, // teachers
  });
};

const login = async (req, res) => {
  let data = req.body;
  console.log("input: ", data);
  let fUser = await TeacherModel.findOne({ cnic: data?.cnic });
  if (fUser) {
    let verfied = await GeneralConrtller.ComparePassword(
      data?.password,
      fUser?.password
    );
    if (verfied) {
      return res
        .status(200)
        .json({ msg: "Loged In Successfully", success: true, results: fUser });
    } else {
      return res
        .status(200)
        .json({ msg: "Invalid Password", success: false, results: null });
    }
  } else {
    return res
      .status(200)
      .json({ msg: "Invalid Cnic", success: false, results: null });
  }
};

const block = async (req, res) => {
  let _id = req.params._id;
  console.log(_id, "_id");
  try {
    let fUser = await TeacherModel.findOne({ _id: _id });
    let updated = await TeacherModel.findOneAndUpdate(
      { _id: _id },
      { blocked: !fUser.blocked },
      { new: true }
    )
      .populate("subjectId")
      .populate("courses");
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Updated Successfullfy",
      updated,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const assignCourse = async (req, res) => {
  const data = req.body;
  let foundTeacher = await TeacherModel.findOne({
    _id: data.teacher,
  });

  let foundAlreadyAssignCourse = foundTeacher.courses.find(
    (ls) => ls._id == data.course
  );
  if (foundAlreadyAssignCourse) {
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Already assigned",
      false,
      true
    );
  }

  let updated = await TeacherModel.findOneAndUpdate(
    {
      _id: data.teacher,
    },
    {
      courses: data.course,
    },
    {
      new: true,
    }
  )
    .populate("subjectId")
    .populate("courses");

  return GeneralConrtller.ResponseObj(
    res,
    200,
    "Updated Successfullfy",
    updated,
    true
  );
};

const myupdates = async (req, res) => {
  let updates = await TeacherModel.updateMany(
    {},
    {
      image: {
        url: "/image/eeb34bbc5fbabb89ece479f18e9f3a3a.jpeg",
        name: "imgbin-teacher-computer-icons-teacher-tFagkvTgZM96dFFgZRWRrQxkg.jpeg",
      },
    }
  );
  return GeneralConrtller.ResponseObj(
    res,
    200,
    "Updated Successfullfy",
    updates,
    true
  );
};

module.exports = {
  addTeacher,
  updateTeacher,
  getSingleTeacher,
  allTeachers,
  removeTeachers,
  removeSingleTeacher,
  login,
  block,
  assignCourse,
  myupdates,
};
