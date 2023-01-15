const Router = require("express").Router();
const AdminController = require("../../Controllers/Admin/admin");

Router.post("/login", AdminController.login);

Router.post("/signup", AdminController.addAdmin);

module.exports = Router;
