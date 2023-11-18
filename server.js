const express = require("express");
const app = express();
const connectDb = require("./database/dbConnection.js");
const adminRouter = require("./routes/admin.js");

app.use(express.json());
app.use("/admin", adminRouter);
app.post("/");

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`server started at port ${PORT}`)
})
connectDb