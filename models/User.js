const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName :{
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    userId : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        enum : ['admin', 'Master'],
        default : 'admin',
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match : /.+\@.+\..+/
    },
    password : {
        type : String,
        required : true
    } 
})

module.exports = mongoose.model('User', UserSchema);