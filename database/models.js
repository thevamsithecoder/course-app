const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageLink : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
},{timestamps:true})

const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {Admin, Course};