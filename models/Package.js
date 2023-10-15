const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product',
            required : true
        }
    ],
    // images : [{
    //     fileId : Schema.Types.ObjectId,
    //     alt : String
    // }],
    defaultPrice : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        trim : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date
    }
});

// Middleware to auto-update the updatedAt field on document updates.
packageSchema.pre('save', (next) => {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Package', packageSchema);