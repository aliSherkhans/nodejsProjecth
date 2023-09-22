const dotEnv = require("dotenv");
const app = require("./app.js");
dotEnv.config({path : "./config.env"});

process.on("uncaughtException", (error)=>{
    console.log("uncaughtException >> ", error.name, error.message);
    process.exit(1);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, "localhost", ()=>console.log(`Server start at PORT ${PORT}`));

process.on("unhandledRejection", (error)=>{
    console.log("unhandledRejection >> ", error.name, error.message);

    server.close(()=>{
        process.exit(1);
    })
})

