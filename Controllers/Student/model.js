const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    image: {
        type: String,
    },
    resetPassCode: {
        type: Number,
    },
    regNumber: {
        type: String,
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default : Date.now()
    }
})

StudentSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        // delete ret.resetPassCode;
        return ret;
    }
});

module.exports = mongoose.model("tblstudents", StudentSchema);