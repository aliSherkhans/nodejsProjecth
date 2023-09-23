module.exports = (func)=>{
    return (req, resp, next)=>{
        func(req, resp, next).catch((error)=> {
            console.log("drrror ,",  error)
            next(error)})
    }
}