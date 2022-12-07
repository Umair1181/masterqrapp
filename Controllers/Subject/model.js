const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: {
        type: String,
    },
    subCode: {
        type: String,
    },
    createdAt: {
        type: Date,
        default : Date.now()
    }
})


module.exports = mongoose.model("tblsubjects", SubjectSchema);