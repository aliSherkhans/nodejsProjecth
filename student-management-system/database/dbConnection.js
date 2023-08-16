const config = require("../config.js");
const mongoose = require("mongoose");
mongoose.connect(config.CONN_DB, {useNewUrlParser : true})
  .then(()=>{
     console.log("Conntection successfully");
  }).catch((error)=>{
     console.log("not connection ",error.message);
  });

module.exports = mongoose;
