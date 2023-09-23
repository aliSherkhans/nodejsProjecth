const userModel = require("../Database/model/userModel.js");
const asyncErrorHandler = require("../Utils/asyncErrorHandler.js");
const CustomError = require("../Utils/CustomError.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotEnv = require("dotenv");
dotEnv.config({ path: ".././config.env" });

exports.singUp = asyncErrorHandler(async (req, resp, next) => {
  const user = req.body;
  if (user.confirmPassword && user.password !== user.confirmPassword) {
    const error = new CustomError("Confirm password is incurrect", 400);
    return next(error);
  }
  const newUser = await userModel.create(req.body);
  newUser.password = undefined;
  resp.status(200).send({
    status: "success",
    message : "Successfully register",
    data: {
      newUser,
    },
  });
});

exports.logIn = asyncErrorHandler(async (req, resp, next) => {
  const userDetails = req.body;
  const registerUser = await userModel.findOne({ email: userDetails.email });
  let token = "";
  if (registerUser) {
     const checkPassword = await bcrypt.compare(userDetails.password, registerUser.password);
    if (checkPassword) {
       token = jwt.sign({ userDetails }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });
      await userModel.findOneAndUpdate({ email: userDetails.email }, {$set : {token : token}})
    } else {
      const error = new CustomError("Password incorrect", 400);
      next(error);
      return;
    }
  } else {
    const error = new CustomError("User not found", 404);
    next(error);
    return;
  }

  // resp.status(200).json({
  //   status: "Success",
  //   message: "LogIn successfully",
  //   token,
  // });
});
