const Router = require("express").Router();
const EnrolmentController = require("../../Controllers/Enrolments/enrolments");
const Validator = require("../../Controllers/Enrolments/validator");

Router.post("/", Validator.post, EnrolmentController.post);
Router.get("/student/:studentId", EnrolmentController.getStudentEnrolment);
Router.get("/course/:courseId", EnrolmentController.getCourceEnrolements);
Router.get("/", EnrolmentController.get);

Router.delete("/:_id", EnrolmentController.deleteSingle);

module.exports = Router;
