const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendenceSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tblstudents",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tblcourses",
  },
  markInDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// AttendenceSchema.set('toJSON', {
//     transform: function(doc, ret, options) {
//         delete ret.password;
//         delete ret.__v;
//         // delete ret.resetPassCode;
//         return ret;
//     }
// });

module.exports = mongoose.model("tblattendences", AttendenceSchema);
