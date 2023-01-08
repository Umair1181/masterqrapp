const Router = require("express").Router();
const StudentController = require("../../Controllers/Student/student");

Router.post("/signup", StudentController.addStudent);

Router.post("/scanqr", StudentController.scanQr);

Router.get("/", StudentController.allStudents);

Router.delete("/", StudentController.removeStudents);

Router.get("/:_id?", StudentController.getSingleStudent);

Router.post("/signin", StudentController.login);

module.exports = Router;
