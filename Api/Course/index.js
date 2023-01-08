const Router = require("express").Router();
const CourseController = require("../../Controllers/Courses/courses");
const Validator = require("../../Controllers/Courses/validator");

Router.post("/", Validator.post, CourseController.post);

Router.put("/", Validator.update, CourseController.update);

Router.get("/:_id", CourseController.getSingleCourse);

Router.get("/", CourseController.get);

Router.delete("/:_id", CourseController.deleteSingle);

Router.delete("/", CourseController.deleteList);

module.exports = Router;
