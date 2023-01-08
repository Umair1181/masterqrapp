const Router = require("express").Router();
const SubjectController = require("../../Controllers/Subject/subject");
const Validator = require("../../Controllers/Subject/validator");

Router.post("/", Validator.post, SubjectController.post);

Router.put("/", Validator.update, SubjectController.update);

Router.get("/", SubjectController.get);

Router.delete("/:_id", SubjectController.deleteSingle);

Router.delete("/", SubjectController.deleteList);

module.exports = Router;
