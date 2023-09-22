const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({path : "./config.env"});

mongoose.connect(process.env.LOCAL_CONN_STR, {useNewUrlParser : true})
.then(()=>{
    console.log("Connection successfully");
}).catch((error)=>{
console.log(error.message);
})