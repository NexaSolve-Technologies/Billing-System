const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = Schema({
    name : {
        type : String,
        required : true,
        maxlenght : 255
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    category : {
        type : String,
        maxlength : 255
    },
    description : {
        type : String,
        maxlength : 1000
    },
    images : [{
        url : String,
        alt : String
    }],
    stock : {
        type : Number,
        required : true,
        min : 0
    },
    productId : {
        type : Number,
        required : true
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date
    }
}) 

productSchema.pre('save', function(next) {
    if(!this.isNew) {
        this.updatedAt = Date.now();
    }
    
    next();
})

module.exports = mongoose.model('Product', productSchema);