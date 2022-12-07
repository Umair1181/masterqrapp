const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
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


AdminSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
})
module.exports = mongoose.model("tbladmins", AdminSchema);