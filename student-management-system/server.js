const app = require("./application/app.js");
const config = require("./config.js");
const PORT = config.PORT;
const IP = config.IP;
app.listen(+PORT, IP, () => console.log(`server started port ${PORT}`));
