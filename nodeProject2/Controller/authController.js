const userModel = require("../Database/model/userModel.js");
const asyncErrorHandler = require("../Utils/asyncErrorHandler.js");

exports.singUp = asyncErrorHandler(async (req,resp,next)=>{
  const newUser = await userModel.create(req.body);
  newUser.password = undefined;
resp.status(200).send({
    status : "success",
    data : {
        newUser
    }
})
});