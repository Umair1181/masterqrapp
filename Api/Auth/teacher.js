const Router = require("express").Router();
const TeacherController = require("../../Controllers/Teacher/teacher");
const { upload } = require("../../storage")();


Router.post( '/add',  upload.single("image"), TeacherController.addTeacher )


Router.get( '/', (req, res) => TeacherController.allTeachers(req, res));

Router.delete( '/', (req, res) => TeacherController.removeTeachers(req, res));


Router.get( '/:_id?', (req, res) => TeacherController.getSingleTeacher(req, res));

Router.post( '/signin', (req, res) => TeacherController.login(req, res));

Router.patch( '/block-unblock/:_id?', (req, res) => TeacherController.block(req, res));


module.exports = Router;