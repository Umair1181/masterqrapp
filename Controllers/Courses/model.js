const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  courseCode: {
    type: String,
  },
  title: {
    type: String,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tblsubjects",
  },
  attendenceMarkingOpen: {
    type: Boolean,
    default: false,
  },
  qrCodeId: {
    type: String,
    default: null,
  },
  creditHours: {
    type: Number,
    default: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("tblcourses", CoursesSchema);
