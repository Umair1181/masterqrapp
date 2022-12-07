
const Router = require("express").Router();

const AdminController = require("../../Controllers/Admin/admin");


Router.post( '/signup', (req, res) => AdminController.addAdmin(req, res));


module.exports = Router;