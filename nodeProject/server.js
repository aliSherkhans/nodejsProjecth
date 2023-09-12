const app = require("./application/app.js")
const PORT = process.env.PORT || 500
const IP = process.env.IP || "localhost";
app.listen(PORT, IP, ()=> console.log(`Server is runing at PORT ${PORT}`));