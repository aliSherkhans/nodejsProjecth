const app = require("./application/app.js");
const PORT = 5000;
const IP = "localhost";
app.listen(PORT, IP, ()=>console.log("server start"));