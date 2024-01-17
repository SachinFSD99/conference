const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const RegisterModel = mongoose.model("user",registerSchema);

module.exports = {RegisterModel}