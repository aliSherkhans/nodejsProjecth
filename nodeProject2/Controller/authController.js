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
      return next(error);
    }
  } else {
    const error = new CustomError("User not found", 404);
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    message: "LogIn successfully",
    token,
  });
});

exports.updateProfile = asyncErrorHandler(async (req, resp ,next)=>{
  const userExists = await userModel.findById(req.params.id);

  if(!userExists){
    const error = new CustomError("User Not Found", 404);
    return next(error)
  }

  await userModel.findByIdAndUpdate(req.params.id, {$set : req.body})
  
  resp.status(200).json({
    status : "Success",
    message : "Update profile"
  })
})

exports.logout = asyncErrorHandler(async (req, resp, next)=>{
  const userExists = await userModel.findOne({email : req.body.email});

  if(userExists){
     const checkPassword = await bcrypt.compare(req.body.password, userExists.password);
     if(checkPassword){
      await userModel.findOneAndUpdate({email : req.body.email}, {$set : {active : false}});
     }else{
      const error = new CustomError("Password incorrect", 400);
      return next(error);
    }
  }else{
    const error = new CustomError("User Not Found", 404);
    return next(error);
  }

  resp.status(200).json({
    status : "Success",
    message : "Successfully logout"
  })
})


exports.buyPremium = asyncErrorHandler(async (req, resp, next)=>{
  const userExists = await userModel.findOne({email : req.body.email});
  if(req.body.payMent){
  if(userExists){
     const checkPassword = await bcrypt.compare(req.body.password, userExists.password);
     if(checkPassword){
      await userModel.findOneAndUpdate({email : req.body.email}, {$set : {userType : "Subscribe"}});
     }else{
      const error = new CustomError("Password incorrect", 400);
      return next(error);
    }
  }else{
    const error = new CustomError("User Not Found", 404);
    return next(error);
  }
}else{
  const error = new CustomError("Pay payment for subscribe", 400);
  return next(error);
}

  resp.status(200).json({
    status : "Success",
    message : "Successfully subscribe"
  })
})


