const StudentModel = require("./model");
// var multiparty = require('multiparty');
const { GeneralConrtller } = require("../generalController");
const addStudent = async (req, res) => {
  let data = req.body;
  console.log("data: ", data);
  if (await getSingleTeacher({ cnic: data?.cnic })) {
    return res.status(400).json({
      msg: "Cnic Repeated",
      success: false,
      data: null, // gotData
    });
  }
  if (
    await getSingleTeacher({
      regNumber: data?.regNumber,
    })
  ) {
    return res.status(400).json({
      msg: "Registration Number Repeated",
      success: false,
      data: null, // gotData
    });
  }
  let dimPass = "student123";
  let generatedPass = await GeneralConrtller.PrepPassword(dimPass);
  if (!generatedPass) {
    return res.status(200).json({
      msg: "Password Encryption Failed",
      data: null,
      success: false,
    });
  }
  let newStudent = new StudentModel({
    firstName: data?.firstName,
    lastName: data?.lastName,
    regNumber: data?.regNumber,
    cnic: data?.cnic,
    city: data?.city,
    age: data?.age,
    password: generatedPass,
  });
  let createdStudent = await newStudent.save();
  return res.status(200).json({
    msg: "Student added Successfully",
    results: createdStudent,
    success: true,
  });
};

const updateStudent = async (req, res) => {
  if (!req.params._id) {
    return res.status(400).json({
      msg: "Student Id Missing",
      success: false,
      data: null, // gotData
    });
  }
  const studentId = req.params._id;
  const data = req.body;
  let toUpdate = {};
  if (data?.firstName) {
    toUpdate = { ...toUpdate, firstName: data?.firstName };
  }
  if (data?.lastName) {
    toUpdate = { ...toUpdate, lastName: data?.lastName };
  }
  if (data?.regNumber) {
    toUpdate = { ...toUpdate, regNumber: data?.regNumber };
  }
  if (data?.cnic) {
    toUpdate = { ...toUpdate, cnic: data?.cnic };
  }
  if (data?.city) {
    toUpdate = { ...toUpdate, city: data?.city };
  }
  if (data?.age) {
    toUpdate = { ...toUpdate, age: data?.age };
  }
  if (await getSingleStudent({ cnic: data?.cnic, _id: { $ne: studentId } })) {
    return res.status(400).json({
      msg: "Cnic Repeated",
      success: false,
      data: null, // gotData
    });
  }
  if (
    await getSingleStudent({
      regNumber: data?.regNumber,
      _id: { $ne: studentId },
    })
  ) {
    return res.status(400).json({
      msg: "Registration Number Repeated",
      success: false,
      data: null, // gotData
    });
  }
  let gotData = await TeacherModel.findOneAndUpdate(
    {
      _id: studentId,
    },
    toUpdate,
    {
      new: true,
    }
  );

  return res.status(200).json({
    msg: "Updated Successfully",
    success: true,
    data: gotData, // gotData
  });
};

const getSingleStudent = async (req, res) => {
  const studentId = req.params._id;
  if (studentId) {
    let found = await StudentModel.findOne({ _id: studentId });
    if (found) {
      return res.status(200).json({
        msg: "Studentt Found",
        success: true,
        results: found,
        total: 1,
      });
    } else {
      return res.status(404).json({
        msg: "Student Not Found",
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

const scanQr = async (req, res) => {
  return res.json({ msg: "check: scanQr" });
};

const allStudents = async (req, res) => {
  let students = await StudentModel.find();
  let total = await StudentModel.count();

  return res.status(200).json({
    msg: "All Students",
    success: students?.length > 0 ? true : false,
    results: students,
    total,
  });
};

const removeStudents = async (req, res) => {
  let students = await StudentModel.deleteMany();

  return res
    .status(200)
    .json({ msg: "Removed Successfully", success: true, students: students });
};

const removeSingleStudents = async (req, res) => {
  const studentId = req.params.studentId;
  let students = await StudentModel.deleteOne({ _id: studentId });

  return res
    .status(200)
    .json({ msg: "Removed Successfully", success: true, students: students });
};

const login = async (req, res) => {
  let data = req.body;
  console.log("input: ", data);
  let fUser = await StudentModel.findOne({ regNumber: data?.regNumber });
  if (fUser) {
    console.log("fUser?.password: ", fUser?.password);
    if (fUser.blocked) {
      return res
        .status(400)
        .json({ msg: "Blocked", success: false, results: null });
    }
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
    return res.status(200).json({
      msg: "Invalid Registration Number",
      success: false,
      results: null,
    });
  }
};

const block = async (req, res) => {
  let _id = req.params._id;
  console.log(_id, "_id");
  try {
    let fUser = await StudentModel.findOne({ _id: _id });
    let updated = await StudentModel.findOneAndUpdate(
      { _id: _id },
      { blocked: !fUser.blocked },
      { new: true }
    );
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

module.exports = {
  addStudent,
  updateStudent,
  scanQr,
  getSingleStudent,
  allStudents,
  removeStudents,
  removeSingleStudents,
  login,
  block,
};
