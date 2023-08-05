const fs = require("fs");
const teachers = JSON.parse(fs.readFileSync("data/teachers.json", {encoding : "utf-8"}));

function userIdentification(req, res, next){
    const id = req.url.split("/")
    const userId = Number(id[id.length-1]);
    if(!userId){
       res.status(500).send("Invalid Id")
    } else {
       const filterData = teachers.filter(teacher => teacher.teacherid === userId);
       if(filterData.length === 1){
          next();
       }else if(filterData.length > 1){
          res.status(400).send("More than one record found for the given student id.")
       }else{
          res.status(400).send("Student not found given id");
       }
    }
  }

module.exports = userIdentification;  