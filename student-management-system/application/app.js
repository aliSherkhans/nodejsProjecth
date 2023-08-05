const express = require("express");
const studentRouter = require("../Router/student-router.js");
const teacherRouter = require("../Router/teacher-router.js");

const app = express();

app.use(express.json());

app.route("/").get((req, resp)=>{
   resp.send("home page");
})

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);

 module.exports = app;