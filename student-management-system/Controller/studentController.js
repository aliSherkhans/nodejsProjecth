const fs = require("fs")
const students = JSON.parse(fs.readFileSync("data/students.json", {encoding : "utf-8"}));

// GET all student data
function getAllStudent(req, resp){
    const studentData = {
        status : "success",
        data:{
            students,
        }
    }
    resp.json(studentData)
};


// GET student data by Id
function getStudentById(req, resp){
    const studentId = Number(req.params.studentId)
    const filterStudentData = students.filter(student => student.studentid === studentId);
    const sendData = {
        status : "Success",
        data : {
            student : filterStudentData[0]
        }
    }
    resp.status(200).json(sendData);
}

// Create student data
function createStudent(req, resp){
    const studentData = req.body;
    if(studentData.length > 0){
        const studentData = req.body;
        studentData.forEach(student => {
            createRespone(student);
        });
        resp.send("Successfully Cerate by bulk")
    }else{
        createRespone(studentData)
       resp.send("Successfully Cerate by id")  
    }
    fs.writeFileSync("data/students.json", JSON.stringify(students));
}

function createRespone(student) {
    const studentid = students[students.length - 1].studentid + 1;
    const studentResponse = Object.assign({ studentid }, student);
    students.push(studentResponse);
}

// UPDATE student data by Id and Bulk
function updateStudent(req, resp){
    const urls = req.url.split("/");
    const userId = Number(urls[urls.length-1]);
    const reqBody = req.body;
    if(reqBody.length > 0){
            reqBody.forEach(newStudent => {
                students.forEach(oldStudent => {
                 if (newStudent.studentid === oldStudent.studentid) {    
                       updateStudents(newStudent, oldStudent);
                    }
            })})       
            resp.send("Successfully update by bulk") 
    }else if(userId){
            const findStudent = students.filter(student => student.studentid === userId);
            updateStudents(reqBody, findStudent[0]);
            resp.send("Successfully update by id")
    }else{
            resp.status(404).send("Not Found")
    }
      fs.writeFileSync("data/students.json", JSON.stringify(students));
}

function updateStudents(newStudent, oldStudent) {
        Object.assign(oldStudent, newStudent);
}

// delete student by id 
function deleteStudent(req, resp){
    const urls = req.url.split("/");
    const userId = Number(urls[urls.length-1]);
    const reqBody = req.body;
    if(reqBody.length > 0){
        reqBody.forEach(delStudent => {
            students.forEach(oldStudent => {
                if(oldStudent.studentid === delStudent.id){
                    const findIndex = students.findIndex(student => student.studentid === delStudent.id);
                    students.splice(findIndex, 1);
                }
            })
        })
        resp.status(200).send("Successfully delete by bulk")
    }else if(userId){
        const findIndex = students.findIndex(student => student.studentid === userId);
        students.splice(findIndex, 1);
        resp.status(200).send("Successfully delete by id")
    }else{
        resp.status(404).send("Not Found");
    }
    fs.writeFileSync("data/students.json", JSON.stringify(students));
}

module.exports = {
    getAllStudent,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}