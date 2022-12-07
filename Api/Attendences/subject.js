const Router = require("express").Router();
const SubjectController = require("../../Controllers/Subject/subject");
const Validator = require("../../Controllers/Subject/validator");

Router.post( '/',Validator.post, SubjectController.post )

Router.put( '/',Validator.update, SubjectController.update )

Router.get( '/', SubjectController.get )

Router.delete( '/', SubjectController.deleteList )





// Router.get( '/', SubjectController.GetAttendences )

// Router.delete( '/', SubjectController.deleteRecords )



module.exports = Router;