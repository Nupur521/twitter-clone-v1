const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');



//This is called schema validation, the username and password will be automatically added by the package passport local mongoose
const userSchema1=new mongoose.Schema({
    firstName: {
        type: String,
        trim:true,
        required:true
    },
    lastName:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    }
});

userSchema1.plugin(passportLocalMongoose);


//The user is a js class that has objects and methods to manipulate the data
const user=mongoose.model("user", userSchema1);

module.exports=user;
