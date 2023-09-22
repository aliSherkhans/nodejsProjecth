const CustomError = require("../Utils/CustomError");
const dotEnv = require("dotenv");
dotEnv.config({path : "./config.env"})

const devErrors = (resp, error)=>{
    resp.status(error.statusCode).json({
        status : error.status,
        message : error.message,
        stackTrace : error.stack,
        error : error,
    })
}

const castErrorHandler = (error)=>{
    const msg = `Invalid value for ${err.path}: ${err.value}!`
   return new CustomError(msg, 400)
}

const duplicateKeyErrorHandler = (error)=>{
    const name = error.keyValue.name;
    const msg = `There is already a movie with name ${name}. Please use another name!`;
  
    return new CustomError(msg, 400);
}

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map((val) => val.message);
    const errorMessages = errors.join(". ");
    const msg = `Invalid input data: ${errorMessages}`;
  
    return new CustomError(msg, 400);
  };

const prodErrors = (resp, error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
          });
    }else{
        res.status(500).json({
            status: "error",
            message: "Something went wrong! Please try again later.",
          });
    }
}

  module.exports = (error, req, resp,)=>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || "error"

    if(process.env.NODE_DEV === "development"){
        devErrors(resp, error);
    }else{
        if(error.name === "CastError"){
            error = castErrorHandler(error)
        }
        if(error.code === 11000){
            error = duplicateKeyErrorHandler(error);
        }
        if(error.name === "ValidationError"){
            error = validationErrorHandler(error);
        }

        prodErrors(resp, error);
    }
  }