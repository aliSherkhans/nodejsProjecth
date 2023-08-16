const express = require("express");
const teacherApi = require("../Controller/teacherController.js");
const userIdentification = require("../middleware/teacher-middleware.js");
const teacherRouter = express.Router();

teacherRouter.route(" ").get(teacherApi.getAllTeacher).post(teacherApi.createTeacher).delete(teacherApi.deleteTeacher).put(teacherApi.updateTeacher);

teacherRouter.route("/:mobile").get(teacherApi.getTeacherByMobile).delete(teacherApi.deleteTeacher)
.put(teacherApi.updateTeacher);

teacherRouter.param("mobile", userIdentification)

module.exports = teacherRouter;

