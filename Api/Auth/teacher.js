const Router = require("express").Router();
const TeacherController = require("../../Controllers/Teacher/teacher");
const { upload } = require("../../storage")();

Router.post("/add", upload.single("image"), TeacherController.addTeacher);

Router.put("/update/:_id", TeacherController.updateTeacher);

Router.get("/", TeacherController.allTeachers);

Router.delete("/:teacherId", TeacherController.removeSingleTeacher);

Router.delete("/", TeacherController.removeTeachers);

Router.get("/:_id?", TeacherController.getSingleTeacher);

Router.post("/signin", TeacherController.login);

Router.patch("/block-unblock/:_id?", TeacherController.block);

Router.put("/assign-course", TeacherController.assignCourse);

module.exports = Router;
