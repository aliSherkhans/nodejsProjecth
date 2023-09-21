const mongoose = require("../dbConnection.js");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
    require: true,
  },
  class: Number,
});

const studentModel = new mongoose.model("student", studentSchema,);
module.exports = studentModel;
