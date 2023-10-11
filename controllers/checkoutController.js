const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Purchase = require("../models/Purchase");
const Package = require("../models/Package")
const Sale = require("../models/Sale");

const addCustomer = async (req, res) => {
    try {
        const { name, phone, email} = req.body;
        
        if(!name || !phone) {
            res.status(400).json({
                message : "Please provide name and phone number"
            });
        }
        
        const oldCustomer = await Customer.findOne({phone});
        if(oldCustomer){
            return res.status(200).json(oldCustomer)
        }
        
        // create a new Customer :-
        const newCustomer = await Customer.create({
            name,
            phone,
            email
        });
        
        res.status(201).json({newCustomer});

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const addPurchase = async (req, res) => {
    try {
        const {customerId, productId, packageId, ProductQuantity, PackageQuantity} = req.body;        

        const newPurchase = await Purchase.create({
            customerId,
            productId,
            ProductQuantity,
            PackageQuantity
        });

        res.status(200).json(newPurchase)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}

const addSales = async (req, res) => {
    try {
        const {productId, packageId, productQuantity, packageQuantity, totalPrice } = req.body;        
        
        const product = await Product.findById(productId);
        const package = await Package.findById(packageId);
        
        let ProductPrice = 0;
        let PackagePrice = 0;
        if(package) {
            PackagePrice = package.customPrice * packageQuantity; 
        }
        if(product) {
            ProductPrice = product.price * productQuantity; 
        }

        let Price = ProductPrice + PackagePrice;
        console.log(Price);

        const newSales = await Sale.create({
            productId,
            packageId,
            productQuantity,
            packageQuantity,
            totalPrice : Price
        })

        res.status(200).json(newSales);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : 'Internal Server Error'
        });
    }
}

module.exports = {
    addCustomer,
    addPurchase,
    addSales
}