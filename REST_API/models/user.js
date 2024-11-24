const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name:{
        type: String,
    },
    job_title:{
        type: String,
    },
    gender:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true});

//Model
const user = mongoose.model("Users", userSchema);

module.exports = user;