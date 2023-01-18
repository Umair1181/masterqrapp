const Router = require("express").Router();
const StudentController = require("../../Controllers/Student/student");

Router.put("/myupdate", StudentController.myupdate);

Router.post("/signup", StudentController.addStudent);

Router.put("/:_id", StudentController.updateStudent);

Router.post("/scanqr", StudentController.scanQr);

Router.get("/", StudentController.allStudents);

Router.delete("/:studentId", StudentController.removeSingleStudents);

Router.delete("/", StudentController.removeStudents);

Router.post("/signin", StudentController.login);

Router.put("/block/:_id", StudentController.block);

Router.get("/:_id", StudentController.getSingleStudent);

module.exports = Router;
