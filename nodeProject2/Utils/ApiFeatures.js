const movieModel = require("../Database/model/moviesModel.js");

class ApiFeature{
    constructor(query, queryObj){
        this.query = query;
        this.queryObj = queryObj;
    }

    filter(){
        const copyQueryObj = {...this.queryObj};
        const mongodbObjKey = [...Object.keys(movieModel.schema.obj)];
        const queryObjKey = [Object.keys(this.queryObj)];
        queryObjKey.forEach((key)=>{
            if(!mongodbObjKey.includes(key)){
                delete copyQueryObj[key];
            }
        });
        
        const queryStr = JSON.stringify(copyQueryObj);
        const queryStrReplace = queryStr.replace(/\b(gte|gt|lte|le|eq)\b/gi, (match)=>`$${match}`);
        const queryObj = JSON.parse(queryStrReplace);
        this.query = this.query.find(queryObj);

        return this;
    }

    sort(){
        if(req.queryObj.sort){
            const sortBy = this.queryObj.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort("-rates");
        }
        return this
    }

    limitFields(){
            if(req.queryObj.limitField){
                const limitField = this.queryObj.limitField.split(",").join(" ");
                this.query = this.query.select(limitField);
            }else{
                this.query = this.query.select("-__v");
            }
            return this
        }

        paginate(){
            const page = req.queryObj.page || 1;
            const limit = req.query.limit || 3;
            const skip = (page - 1) * limit;
            this.query = this.query.skip(skip).limit(limit);

                // if(this.queryStr.page){
        //     const moviesCount = await Movie.countDocuments();
        //     if(skip >= moviesCount){
        //         throw new Error("This page is not found!");
        //     }
        // }

        return this;
        }
}

module.exports = ApiFeature;