const dotEnv = require("dotenv");
dotEnv.config({path : ".env"});
process.env.PORT = process.env.PORT || 4500
process.env.IP = process.env.IP || "localhost"
process.env.CONN_DB = process.env.CONN_DB || "mongodb://127.0.0.1:27017/sms"
module.exports = process.env;
