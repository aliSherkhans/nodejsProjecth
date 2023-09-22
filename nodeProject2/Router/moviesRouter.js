const express = require("express");
const moviesController = require("../Controller/moviesController");

const Router = express.Router()

Router.route("/highest-rated").get(moviesController.getHighestRated, moviesController.getAllMovies);


module.exports = Router;