const Router = require("express").Router();

Router.use("/student", require("../Api/Auth/student"));
Router.use("/admin", require("../Api/Auth/admin"));
Router.use("/teacher", require("../Api/Auth/teacher"));
Router.use("/subject", require("../Api/Attendences/subject"));
Router.use("/course", require("../Api/Course"));

Router.use("/attendence", require("../Api/Attendences/attendence"));
Router.use("/enrolments", require("../Api/Enrolments"));
Router.use("/dashboard", require("../Api/Stats/dashboard"));

module.exports = Router;
