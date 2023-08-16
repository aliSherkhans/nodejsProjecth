const studentModel = require("../database/model/studentSchema.js");

async function userIdentification(req, resp, next, mobile){
   const userMobile = JSON.parse(mobile);
   console.log("middel", userMobile);
   try{
   if(userMobile.length > 0){
       for(let mobile of userMobile){
          const student = await studentModel.find({"mobile" : mobile});
          if(student.length === 0){
            resp.status(404).send({"error" : "Student not found given by mobile"})
          }else if(student.length > 1){
            resp.status(400).send({"error" : "More than one record found for the given mobile number."})
          }
       }
       next ()
   }else {
          const student = await studentModel.find({"mobile" : mobile});
          console.log(student);
          if(student.length === 0){
            resp.status(404).send({"error" : "Student not found given by mobile"})
          }else if(student.length > 1){
            resp.status(400).send({"error" : "Student not found given by mobile"})
          }
          next();
   }
} catch (error) {
    resp.status(500).send({"Error" : error.message});
}
}

module.exports = userIdentification