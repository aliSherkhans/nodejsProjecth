const studentModel = require("../database/model/studentSchema.js");

async function studentValidator(req, resp, next, mobile) {
  const userMobile = JSON.parse(mobile);
  console.log("middel", userMobile);
  try {
    if (userMobile.length > 0) {
      for (let mobile of userMobile) {
        checkStudent(resp, mobile);
      }
      next();
    } else {
      checkStudent(resp, mobile);
      next();
    }
  } catch (error) {
    resp.status(500).send({ Error: error.message });
  }
}

async function checkStudent(resp, mobile) {
  const student = await studentModel.find({ mobile: mobile });
  if (student.length === 0) {
    resp.status(404).send({ error: "Student not found given by mobile" });
  } else if (student.length > 1) {
    resp.status(400).send({
      error: "More than one record found for the given mobile number.",
    });
  }
}
module.exports = studentValidator;
