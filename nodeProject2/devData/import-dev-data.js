const movieModel = require("../Database/model/moviesModel.js");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const fs = require("fs");

dotEnv.config({path : "./config.env"});

mongoose.connect(process.env.LOCAL_CONN_STR, {useNewUrlParser : true})
.then(()=>{
    console.log("Connection successfully");
}).catch((error)=>{
    console.log(error.message);
})

const content = JSON.parse(fs.readFileSync("./devData/movies.json", "utf-8"));

const importMovies = async()=>{
 try{
    const movie = await movieModel.create(content)
    console.log("Data successfully imported!")
 }catch(error){
    console.log(error.message);
 }  
 process.exit();
}

const deleteMovies = async ()=>{
    try{
        const movie = await movieModel.deleteMany({});
        console.log("Data successfully deleted");
    }catch(error){
        console.log(error.message);
    }
    process.exit();
}

if(process.argv[2] === "--import"){
    importMovies();
    console.log("Import working");
}else if(process.argv[2] === "--delete"){
    deleteMovies();
    console.log("delete working");
}