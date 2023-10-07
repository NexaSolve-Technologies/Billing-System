const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product',
            required : true
        }
    ],
    defaultPrice : {
        type : Number,
        required : true
    },
    customPrice : {
        type : Number
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