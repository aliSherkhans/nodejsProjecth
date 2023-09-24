const moviesModel = require("../Database/model/moviesModel.js");

class ApiFeature{
    constructor(query, queryObj){
        this.query = query;
        this.queryObj = queryObj;

    }


    filter(){
        const copyQueryObj = {...this.queryObj};
        const mongodbObjKey = [...Object.keys(moviesModel.schema.obj)];
        const queryObjKey = [Object.keys(this.queryObj)];
        queryObjKey.forEach((key)=>{
            if(!mongodbObjKey.includes(key)){
                delete copyQueryObj[key];
            }
        });
        
        const queryStr = JSON.stringify(copyQueryObj);
        const queryStrReplace = queryStr.replace(/\b(gte|gt|lte|le|eq)\b/gi, (match)=>`$${match}`);
        const queryObje = JSON.parse(queryStrReplace);
        this.query = this.query.find(queryObje);

        return this;
    }

    sort(){
        if(this.queryObj.sort){
            const sortBy = this.queryObj.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort("-ratings");
        }
        return this
    }

    limitFields(){
            if(this.queryObj.limitField){
                const limitField = this.queryObj.limitField.split(",").join(" ");
                this.query = this.query.select(limitField);
            }else{
                this.query = this.query.select("-__v");
            }
            return this
        }

        paginate(){
            const page = this.queryObj.page*1 || 1;
            const limit = this.queryObj.limit*1 || 3;
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