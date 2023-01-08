const Router = require("express").Router();

const AdminController = require("../../Controllers/Admin/admin");

Router.post("/signup", AdminController.addAdmin);

module.exports = Router;
