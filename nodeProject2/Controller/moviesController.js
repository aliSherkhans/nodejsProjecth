const movieModel = require("../Database/model/moviesModel.js");
const ApiFeature = require("../Utils/ApiFeatures.js");
const asyncErrorHandler = require("../Utils/asyncErrorHandler.js");
const CustomError = require("../Utils/CustomError.js");

exports.getHighestRated = (req, resp, next)=>{
    req.query.sort = "-rates";
    req.query.limit = "5";
    next();
}

exports.getAllMovies = asyncErrorHandler(async (req, resp, next)=>{
   const movie = new ApiFeature(movieModel.find(), req.query)
   .filter()
   .sort()
   .limitFields()
   .paginate();

   if(movie.length < 0){
     const error = new CustomError(`Movies not found`, 404);
     next(error);
   }

   resp.statsu(200).send({
    status : "Success",
    dataLength : movie.length,
    data : {
        movie,
    }
   })
})
