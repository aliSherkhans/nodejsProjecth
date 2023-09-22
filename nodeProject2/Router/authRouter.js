const express = require("express");
const authController = require("../Controller/authController");

const Router = express.Router();

Router.route("/signup").post(authController.singUp);

module.exports = Router;
