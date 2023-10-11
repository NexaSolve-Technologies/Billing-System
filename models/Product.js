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
    description : {
        type : String,
        maxlength : 1000
    },
    images : [{
        fileId : Schema.Types.ObjectId,
        alt : String
    }], 
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