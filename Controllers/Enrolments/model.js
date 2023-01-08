const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrolmentSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tblstudents",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tblcourses",
  },
  status: {
    type: String,
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("tblenrolments", EnrolmentSchema);
