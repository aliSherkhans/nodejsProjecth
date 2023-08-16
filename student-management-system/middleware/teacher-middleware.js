const teacherModel = require("../database/model/teacherSchema.js");

async function teacherValidator(req, resp, next, mobile) {
  const userMobile = JSON.parse(mobile);
  console.log("middel", userMobile);
  try {
    if (userMobile.length > 0) {
      for (let mobile of userMobile) {
        checkTeacher(resp, mobile);
      }
      next();
    } else {
      checkTeacher(resp, mobile);
      next();
    }
  } catch (error) {
    resp.status(500).send({ Error: error.message });
  }
}

async function checkTeacher(resp, mobile) {
  const teacher = await teacherModel.find({ mobile: mobile });
  if (teacher.length === 0) {
    resp.status(404).send({ error: "teacher not found given by mobile" });
  } else if (teacher.length > 1) {
    resp
      .status(400)
      .send({
        error: "More than one record found for the given mobile number.",
      });
  }
}

module.exports = teacherValidator;
