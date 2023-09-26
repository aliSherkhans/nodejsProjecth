const moviesModel = require("../Database/model/moviesModel.js");
const ApiFeature = require("../Utils/ApiFeatures.js");
const asyncErrorHandler = require("../Utils/asyncErrorHandler.js");
const CustomError = require("../Utils/CustomError.js");

exports.getHighestRated = (req, resp, next) => {
  req.query.sort = "-ratings";
  req.query.limit = 5;
  next();
};

exports.getAllMovies = asyncErrorHandler(async (req, resp, next) => {
  const movie = new ApiFeature(moviesModel.find(), req.query).sort().paginate();

  const movies = await movie.query;

  if (movies.length < 0) {
    const error = new CustomError(`Movies not found`, 404);
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    dataLength: movies.length,
    data: {
      movies,
    },
  });
});

exports.getMovie = asyncErrorHandler(async (req, resp, next) => {
  const movie = await moviesModel.findById(req.params.id);

  if (!movie) {
    const error = new CustomError("Movie Not Found", 404);
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    movie,
  });
});

exports.createMovie = asyncErrorHandler(async (req, resp, next) => {
  const movie = await moviesModel.create(req.body);

  
  resp.status(200).json({
    status: "Success",
    data : {
      movie
    }
  });

});
