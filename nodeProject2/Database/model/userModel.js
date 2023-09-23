const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const dotEnv = require("dotenv");
dotEnv.config({path : "../.././config.env"});

//name, email, password, confirmPassword, photo
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please enter your confirm password.']
    },

    usertype : {
        type : String,
        default : "user"
    },

    token : {
        type : String
    }
})

userSchema.pre("save", async function(){
    const user = this;
    user.confirmPassword = undefined;
    const token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn : "12h"});
    if(token){
        this.token = token;
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;
});

userSchema.post("save", function(){
    const logFilePath = path.join(__dirname, "../../Log/log.text");
    const registerTime = Date.now()
    const userLog = `Sign Up user at ${registerTime} Time and Name ${this.name}\n`;
    fs.writeFileSync(logFilePath, userLog, {flag : "a"}, (err)=>console.log(err));

})

const User = mongoose.model('User', userSchema);

module.exports = User;