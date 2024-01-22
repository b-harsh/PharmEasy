const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'name field is empty'] },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: { type: String, required: [true, 'password field is empty'] },
    isAdmin:{type:Boolean , default:false , required:true}
}, {
    versionKey: false,
    timestamps: true
})

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };