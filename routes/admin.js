const express = require("express");
const { signup, signin } = require("../controllers/adminController");
const authenticateJwt = require("../middleware/auth");
const { Course } = require("../database/models");

const adminRouter = express.Router();

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);


adminRouter.post("/courses", authenticateJwt, (req,res)=>{
    try {
        const course =  new Course(req.body);
        course.save();
        res.json({
            message : "course created successfully",
            courseId : course.id,
        })
    }
    catch(error) {
        console.log(error);
    }
})

adminRouter.get("/courses/:courseId", authenticateJwt, async (req,res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        res.json({ course })
    }
    catch(error) {
        console.log(error);
    }
})


adminRouter.put("/courses/:courseId", authenticateJwt, async(req,res)=>{
    try {
        const courseId = req.params.courseId;
        const course = await Course.findByIdAndUpdate(courseId, req.body, { new:true });
        if(course) {
            res.json({ message : "course updated successfully" })
        }
        else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    catch(error) {
        console.log(error)
    }
})


adminRouter.delete("/courses/:courseId", authenticateJwt, async(req,res)=>{
    const courseId = req.params.courseId;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if(course) {
            res.status(200).json({ message : "course deleted successfully" })
        }
        else {
            res.status(400).json({ message : "course not found" })
        }
    }
    catch(error) {
        console.log(error);
    }
})


adminRouter.get("/courses", authenticateJwt, async(req,res)=>{
    try {
        const courses = await Course.find({});
        res.json({ courses })
    }
    catch(error) {
        console.log(error)
    }
})


module.exports = adminRouter;