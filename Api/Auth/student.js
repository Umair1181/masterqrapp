const Router = require("express").Router();

const StudentController = require("../../Controllers/Student/student");

Router.post( '/signup', (req, res) => StudentController.addStudent(req, res));

Router.post( '/scanqr', (req, res) => StudentController.scanQr(req, res));

Router.get( '/', (req, res) => StudentController.allStudents(req, res));

Router.delete( '/', (req, res) => StudentController.removeStudents(req, res));


Router.get( '/:_id?', (req, res) => StudentController.getSingleStudent(req, res));

Router.post( '/signin', (req, res) => StudentController.login(req, res));






module.exports = Router;