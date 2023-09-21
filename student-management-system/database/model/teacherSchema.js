const mongoose = require("../dbConnection.js");

const teacherSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: Number,
    require: true,
    unique: true,
  },
  class: Number,
});

const teacherModel = new mongoose.model("teacher", teacherSchema,);
module.exports = teacherModel;
