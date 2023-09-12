const mongoose = require("mongoose");
const config = require("../config.js");
mongoose.connect(config.mongodb, {useNewUrlParser : true})
.then(()=>{
    console.log("Connection Succesfully");
}).catch((error)=>{
    console.log(error);
})