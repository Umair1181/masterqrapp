const Router = require("express").Router();
const CourseController = require("../../Controllers/Courses/courses");
const Validator = require("../../Controllers/Courses/validator");

Router.post("/", Validator.post, CourseController.post);

Router.put("/:_id?", Validator.update, CourseController.update);

Router.put("/attendence/:courseId", CourseController.updateAttendence);

Router.get("/:_id", CourseController.getSingleCourse);

Router.get("/", CourseController.get);

Router.delete("/:_id", CourseController.deleteSingle);

Router.delete("/", CourseController.deleteList);

module.exports = Router;
