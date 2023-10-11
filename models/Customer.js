const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    email : {
        type : String
    }
});

module.exports = mongoose.model('Customer', customerSchema);