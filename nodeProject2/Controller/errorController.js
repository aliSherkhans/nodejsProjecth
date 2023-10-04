const CustomError = require("../Utils/CustomError");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

const devErrors = (resp, error) => {
  console.log("dev");
  resp.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (error) => {
  const msg = `Invalid value for ${error.path}: ${error.value}!`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (error) => {
  const value = error.keyValue.email;
  const msg = `There is already a exists with email ${value}.`;

  return new CustomError(msg, 400);
};

const validationErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

const ObjectParameterError = () => {
  return new CustomError("intrenal server error", 500);
};

const JsonWebTokenError = () => {
  return new CustomError("Invalid token authentication fields", 401);
};

const prodErrors = (resp, error) => {
  if (error.isOperational) {
    console.log("prod");
    resp.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    resp.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

module.exports = (error, req, resp, next) => {
  console.log("globle", error.name);
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_DEV === "production") {
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    else if (error.code === 11000) {
      error = duplicateKeyErrorHandler(error);
    }
    else if (error.name === "ValidationError") {
      error = validationErrorHandler(error);
    }

    else if (error.name === "ObjectParameterError") {
      error = ObjectParameterError(error);
    }

    else if (error.name === "JsonWebTokenError") {
      error = JsonWebTokenError(error);
    }

    prodErrors(resp, error);
  } else {
    devErrors(resp, error);
  }
};
