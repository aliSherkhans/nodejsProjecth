const dotEnv = require("dotenv");
dotEnv.config({path : "./config.env"});
process.env.PORT = process.env.PORT || 5000;
process.env.IP = process.env.IP || "localhost";
process.env.mongodb = process.env.mongodb || "mongodb://127.0.0.1:27017/shops";
process.env.jwt = process.env.jwt || "ali@sher786";

module.exports = process.env;