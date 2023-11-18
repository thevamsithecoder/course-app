const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin, Course} = require("../database/models");


const SECRET_KEY = "COURSEAPI";

const signup = async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
       }
    try {
       const adminAvailable = await Admin.findOne({ email })
       if(adminAvailable) {
        return res.status(400).json({ message: "User already exists" });
       }
       const hashedPasword = await bcrypt.hash(password, 10);
       
       const admin = await Admin.create({
            email : email,
            password : hashedPasword
       })
       const token = jwt.sign(
        {
            email : admin.email,
            id: admin._id
        },
        SECRET_KEY,
        {
            expiresIn : "1h"
        }
       )
       res.status(201).json({
        message : "Admin created successfully",
        user: admin,
        token : token
       })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong"})
    }
}



const signin = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
       }
    try {
        const adminAvailable = await Admin.findOne({ email })
       if(!adminAvailable) {
        return res.status(403).json({ message: "User not found" });
       }
       const hashedPasword = adminAvailable.password;

       const matchPassword = bcrypt.compare(password, hashedPasword)
       if(!matchPassword) {
        return res.status(403).json({ message : "Invalid Credentials" })
       }
       const token = jwt.sign(
        {
            email : adminAvailable.email,
            id: adminAvailable._id,
       },
       SECRET_KEY,
       {
        expiresIn : "1h"
    })
    res.status(200).json({
        message : "login successful",
        admin : adminAvailable,
        token : token
    });
} catch(error){
    console.log(error);
    res.status(500).json({ message: "Something went wrong" })
}
}
module.exports = { signup, signin };