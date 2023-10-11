const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
    },
    packageId : {
        type : Schema.Types.ObjectId,
        ref : 'Package',
    },
    productQuantity : {
        type : Number,
    },
    packageQuantity : {
        type : Number,
    },
    totalPrice : {
        type : Number,
    },
    saleDate : {
        type : Date,
        default : Date.now,
    }    
});

module.exports = mongoose.model('Sale', saleSchema);