const mongoose = require('mongoose');
const Schema = mongoose.Schema

const serviceSchema = Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

serviceSchema.pre('save', function (next) {
    if(!this.isNew) {
        this.updatedAt = Date.now();
    }
    
    next();
})

module.exports = mongoose.model('Service', serviceSchema);