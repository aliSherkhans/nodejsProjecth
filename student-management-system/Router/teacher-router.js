const express = require("express");
const teacherApi = require("../Controller/teacherController.js");
const userIdentification = require("../middleware/teacher-middleware.js")
const teacherRouter = express.Router();



teacherRouter.route("").get(teacherApi.getAllTeacher).post(teacherApi.createTeacher).put(teacherApi.updateTeacher).delete(teacherApi.deleteTeacher);

teacherRouter.route("/:teacherId").get(userIdentification, teacherApi.getTeacherById).delete(userIdentification, teacherApi.deleteTeacher).put(userIdentification, teacherApi.updateTeacher);
module.exports = teacherRouter