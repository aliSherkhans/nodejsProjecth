const express = require("express");
const authController = require("../Controller/authController");
const authVerify = require("../Controller/authVerify");

const Router = express.Router();

Router.route("/signup").post(authController.singUp);
Router.route("/login").post(authController.logIn);
Router.route("/updateprofile/:id").put(authVerify.authVerify, authController.updateProfile);
Router.route("/logout").put(authVerify.authVerify, authController.logout);
Router.route("/subscribe").put(authVerify.authVerify, authController.buyPremium);

module.exports = Router;
