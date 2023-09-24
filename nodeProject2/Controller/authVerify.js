const CustomError = require("../Utils/CustomError");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config({ path: ".././config.env" });

exports.authVerify = asyncErrorHandler(async (req, resp, next) => {
  const headers = req.headers["authorization"];
  if (headers) {
    const token = headers.split(" ")[1];
    if (token) {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      if (verify) {
        next();
      } else {
        const error = new CustomError(
          "Invalid token authentication fields",
          401
        );
        next(error);
      }
    }
  } else {
    const error = new CustomError(
      "Token is required authorization fields",
      403
    );
    next(error);
  }
});
