const Router = require("express").Router();
const AttendenceController = require("../../Controllers/Attendence/attendence");

Router.post("/markin", AttendenceController.AddAttendence);

Router.get("/:_id", AttendenceController.GetAttendences);

Router.delete("/", AttendenceController.deleteRecords);

module.exports = Router;
