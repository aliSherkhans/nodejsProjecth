const teacherModel = require("../database/model/teacherSchema.js");
async function getAllTeacher(req, resp) {
  const teachers = await teacherModel.find();
  if (teachers.length > 0) {
    resp.status(200).send(teachers);
  } else {
    resp.status(500).send("Database is empty no record found");
  }
}
async function getTeacherByMobile(req, resp) {
  const userMobile = JSON.parse(req.params.mobile);
  if (userMobile.length > 0) {
    let response = [];
    try {
      for (let mobile of userMobile) {
        const teacher = await teacherModel.find({ mobile: mobile });
        response.push(...teacher);
      }
    } catch (error) {
      errorShow(resp, error);
    }
    resp.status(200).send(response);
  } else {
    const userMobile = req.params.mobile;
    const teacher = await teacherModel.find({ mobile: userMobile });
    resp.status(200).send(teacher);
  }
}
async function createTeacher(req, resp) {
  const reqBody = req.body;
  if (reqBody.length > 0) {
    try {
      for (let teachers of reqBody) {
        const teacher = new teacherModel(teachers);
        if (teacher) {
          await teacher.save();
        }
      }
      resp.status(200).send("create teacher bulk");
    } catch (error) {
      errorShow(resp, error);
    }
  } else {
    const teacher = new teacherModel(reqBody);
    if (teacher) {
      await teacher.save();
      resp.status(200).send("create teaccher");
    }
  }
}
async function updateTeacher(req, resp) {
  const reqBody = req.body;
  try {
    if (reqBody.length > 0) {
      for (let teaccher of reqBody) {
        await teacherModel.updateOne(
          { mobile: teaccher.mobile },
          { $set: { class: teaccher.class } }
        );
      }
      resp.status(200).send("update teacher bulk");
    } else {
      await teacherModel.updateOne(
        { mobile: reqBody.mobile },
        { $set: { class: reqBody.class } }
      );
      resp.status(200).send("update Teacher");
    }
  } catch (error) {
    errorShow(resp, error);
  }
}
async function deleteTeacher(req, resp) {
  const userMobile = JSON.parse(req.params.mobile);
  try {
    if (userMobile.length > 0) {
      for (let mobile of userMobile) {
        await teacherModel.deleteOne({ mobile: mobile });
      }
      resp.status(500).send("delete teacher bulk");
    } else {
      const userMobile = req.params.mobile;
      await teacherModel.deleteOne({ mobile: userMobile });
      resp.status(200).send("delete teacher");
    }
  } catch (error) {
    errorShow(resp, error);
  }
}
function errorShow(resp, error) {
  resp.status(500).send({ "Error ": error.message });
}
module.exports = {
  getAllTeacher,
  getTeacherByMobile,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
