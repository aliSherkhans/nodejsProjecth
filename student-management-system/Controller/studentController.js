const studentModel = require("../database/model/studentSchema.js");

async function getAllStudent(req, resp) {
  const students = await studentModel.find();
  if (students.length > 0) {
    resp.status(200).send(students);
  } else {
    resp.status(500).send("Database is empty no recored found");
  }
}

async function getStudentByMobile(req, resp) {
  const userMobile = JSON.parse(req.params.mobile);
  if (userMobile.length > 0) {
    let response = [];
    try {
      for (let mobile of userMobile) {
        const student = await studentModel.find({ mobile: mobile });
        response.push(...student);
      }
    } catch (error) {
      errorShow(resp, error);
    }
    resp.status(200).send(response);
  } else {
    const userMobile = req.params.mobile;
    const student = await studentModel.find({ mobile: userMobile });
    resp.status(200).send(student);
  }
}

async function createStudent(req, resp) {
  const reqBody = req.body;
  if (reqBody.length > 0) {
    try {
      for (let students of reqBody) {
        const student = new studentModel(students);
        if (student) {
          await student.save();
        }
      }
      resp.status(200).send("create student bulk");
    } catch (error) {
      errorShow(resp, error);
    }
  } else {
    const student = new studentModel(reqBody);
    if (student) {
      await student.save();
      resp.status(200).send("create student");
    }
  }
}

async function updateStudent(req, resp) {
  const reqBody = req.body;
  try {
    if (reqBody.length > 0) {
      for (let student of reqBody) {
        await studentModel.updateOne(
          { mobile: student.mobile },
          { $set: { class: student.class } }
        );
      }
      resp.status(200).send("update student bulk");
    } else {
      await studentModel.updateOne(
        { mobile: reqBody.mobile },
        { $set: { class: reqBody.class } }
      );
      resp.status(200).send("update Student");
    }
  } catch (error) {
    errorShow(resp, error);
  }
}

async function deleteStudent(req, resp) {
  const userMobile = JSON.parse(req.params.mobile);
  try {
    if (userMobile.length > 0) {
      for (let mobile of userMobile) {
        await studentModel.deleteOne({ mobile: mobile });
      }
      resp.status(200).send("delete student bulk");
    } else {
      const userMobile = req.params.mobile;
      await studentModel.deleteOne({ mobile: userMobile });
      resp.status(200).send("delete student");
    }
  } catch (error) {
    errorShow(resp, error);
  }
}

function errorShow(resp, error) {
  resp.status(500).send({ "Error ": error.message });
}

module.exports = {
  getAllStudent,
  getStudentByMobile,
  createStudent,
  updateStudent,
  deleteStudent,
};
