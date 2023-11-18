const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://vamsikotnisai:Gunupur%40123@cluster0.yedlixo.mongodb.net/courses")
.then(()=> {
    console.log("connected to MongoDB")
})
.catch((err)=> {
    console.log("error occurred while connecting to MongoDB")
})