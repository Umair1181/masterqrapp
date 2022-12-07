const Router = require("express").Router();

Router.use("/student", require("../Api/Auth/student"));
Router.use("/admin", require("../Api/Auth/admin"));
Router.use("/teacher", require("../Api/Auth/teacher"));
Router.use("/subject", require("../Api/Attendences/subject"));


Router.use("/attendence", require("../Api/Attendences/attendence"));







module.exports = Router;