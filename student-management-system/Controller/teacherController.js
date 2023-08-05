const fs = require("fs");
const teachers = JSON.parse(fs.readFileSync("data/teachers.json", {encoding : "utf-8"})); 

//GET teacher data by Id
function getTeacherById(req, resp){
    const teacherId = Number(req.params.teacherId);
    const filterTeacherData = teachers.filter(teacher => teacher.teacherid === teacherId);
    const sendData = {
        status : "Success",
        data : {
            teachers : filterTeacherData[0]
        }
    }
    resp.status(200).json(sendData);
}

// GET all teacher data
function getAllTeacher(req, resp){
    const teachersData = {
        status : "ssuccess",
        data : {
            teachers,
        }
    }
    resp.json(teachersData)
}

// Create teacher data by id and bulk
function createTeacher(req, resp){
    const teacherData = req.body;
    if(teacherData.length > 0){
        teacherData.forEach(teacher =>{
            createResonse(teacher);
        })
        resp.send("Successfully Create bulk")
    }else{
            createResonse(teacherData)
    resp.send("Successfully Create id")
    }
    fs.writeFileSync("data/teachers.json", JSON.stringify(teachers));
}


function createResonse(teacher) {
    const teacherid = teachers[teachers.length - 1].teacherid + 1;
    console.log(teacherid)
    const teacherResponse = Object.assign({ teacherid }, teacher);
    teachers.push(teacherResponse);
}

// UPDATE teacher data by Id and Bulk
function updateTeacher(req, resp){
    const urls = req.url.split("/")
    const userId = Number(urls[urls.length-1]);
    const reqBody = req.body;
    if(reqBody.length > 0){
            reqBody.forEach(updateTeacher => {
                teachers.forEach(oldTeacher => {
                if(updateTeacher.teacherid === oldTeacher.teacherid){    
                updateTeachers(updateTeacher, oldTeacher);
            }
            })})       
            resp.send("Successfully update by bulk") 
    }else if(userId){
            const findTeacher = teachers.filter(teacher => teacher.teacherid === userId);
            updateTeachers(reqBody, findTeacher[0]);
            resp.send("Successfully update by id")
    }else{
            resp.status(404).send("Not Found")
    }
      fs.writeFileSync("data/teachers.json", JSON.stringify(teachers));
}

function updateTeachers(newTeacher, oldTeacher) {
      Object.assign(oldTeacher, newTeacher)
}

// delete student by id and bulk
function deleteTeacher(req, resp){
    const urls = req.url.split("/")
    const userId = Number(urls[urls.length-1]);    
    const reqBody = req.body;
    if(reqBody.length > 0){
        reqBody.forEach(delTeacher => {
            teachers.forEach(oldTeacher => {
                if(delTeacher.id === oldTeacher.teacherid){
                    const findIndex = teachers.findIndex(teacher => teacher.teacherid === delTeacher.id);
                    teachers.splice(findIndex, 1);
                }
            })
        })
        resp.status(200).send("Successfully delete bulk")
    }else if(userId){
        const findIndex = teachers.findIndex(teacher => teacher.teacherid === delTeacher);
        teachers.splice(findIndex, 1);
        resp.status(200).send("Successfully delete id")
    }else{
        resp.status(404).send("Not Found");
    }
    fs.writeFileSync("data/teachers.json", JSON.stringify(teachers));
}

module.exports = {
    getTeacherById,
    getAllTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
}