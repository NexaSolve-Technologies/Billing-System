const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining a Purchase Schema :-
const purchaseSchema = new Schema({
    customerId : {
        type : Schema.Types.ObjectId,
        ref : 'Customer',
        required : true,
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
    },
    packageId : {
        type : Schema.Types.ObjectId,
        ref : 'Package',
    },
    ProductQuantity : {
        type : Number,
    },
    PackageQuantity : {
        type : Number,
    },
    purchaseDate : {
        type : Date,
        default : Date.now(),
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema);