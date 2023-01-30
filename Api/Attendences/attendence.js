const Router = require("express").Router();
const AttendenceController = require("../../Controllers/Attendence/attendence");

Router.post("/markin", AttendenceController.AddAttendence);
// for course only
Router.get("/:_id", AttendenceController.GetAttendences);
// / for course with date
Router.get("/:_id/:_date", AttendenceController.GetAttendencesWithDate);

Router.delete("/", AttendenceController.deleteRecords);

module.exports = Router;
