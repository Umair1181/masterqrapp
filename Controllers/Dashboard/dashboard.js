const { GeneralConrtller } = require("../generalController");
const Teacher_Model = require("../Teacher/model");
const Student_Model = require("../Student/model");

const get = async (req, res) => {
  let allTeachers = await Teacher_Model.find().count();
  let blocked_Teacher = await Teacher_Model.find({ blocked: true }).count();
  let allStudent = await Student_Model.find().count();
  let blocked_Student = await Student_Model.find({ blocked: true }).count();

  return GeneralConrtller.ResponseObj(
    res,
    200,
    "Success",
    {
      allTeachers,
      blocked_Teacher,
      allStudent,
      blocked_Student,
    },
    true
  );
};
module.exports = {
  get,
};
