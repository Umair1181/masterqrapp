const mongoose = require("mongoose");
const { MALE, FEMALE } = require("../consts");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        maxLength: 13,
        minLength: 13,
        required: true,
    },
    gender: {
        type: String,
        enum: [MALE, FEMALE],
        required: true,
    },
    image: {
        type: Object,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subjectId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tblsubjects"
    }],
    blocked:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default : Date.now()
    }
})

TeacherSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        // delete ret.resetPassCode;
        return ret;
    }
});

module.exports = mongoose.model("tblteachers", TeacherSchema);