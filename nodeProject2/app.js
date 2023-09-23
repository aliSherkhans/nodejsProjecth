const express = require("express");
require("./Database/db-config.js");
const moviesRouter = require("./Router/moviesRouter.js");
const authRouter = require("./Router/authRouter.js");
const CustomError = require("./Utils/CustomError.js");
const globleErrorHandler = require("./Controller/errorController.js");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");

app.route("/").get((req, resp)=>{
    resp.render("templates/demo");
})

//USING ROUTES

app.use("/api/v1/user", authRouter);
app.use("/api/v1/movies", moviesRouter);

app.route("*", (req, resp, next)=>{
    const error = new CustomError(`Can not find ${req.originalUrl} on the server!`, 404)
    next(error);
});

app.use(globleErrorHandler);

module.exports = app;