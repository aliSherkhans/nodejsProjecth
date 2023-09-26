const express = require("express");
const moviesController = require("../Controller/moviesController");

const Router = express.Router()

Router.route("/highest-rated").get(moviesController.getHighestRated, moviesController.getAllMovies);
Router.route("/:id").get(moviesController.getMovie);
Router.route("/").get(moviesController.getAllMovies);
Router.route("/").post(moviesController.createMovie)

module.exports = Router;