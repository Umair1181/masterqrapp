const Router = require("express").Router();
const DashBoardController = require("../../Controllers/Dashboard/dashboard");

Router.get("/", DashBoardController.get);

module.exports = Router;
