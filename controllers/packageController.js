const Package = require('../models/Package');
const Product = require('../models/Product');

const addNewPackage = async (req, res) => {
    try{
        const { name, products, customPrice, description } = req.body;
        
        const package = await Package.findOne({name});
        if(package) {
            return res.status(401).json({message : "This name already exists."});
        }
        
        // Calculating the default price by fetching each product's price and summing it up.
        let defaultPrice = 0;
        const fetchedProducts = await Product.find({ '_id' : {$in : products}});
        fetchedProducts.forEach(product => {
            defaultPrice += product.price;
        });
        
        createdBy = req.user.id;
        console.log(req.user);
        
        const newPackage = await Package.create({
            name,
            products,
            defaultPrice : defaultPrice,
            customPrice,
            description,
            createdBy
        })
        
        res.status(201).json(newPackage);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().populate('products createdBy', 'name userName')
        res.status(201).json(packages);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}

const viewSpecificPackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id).populate('products createdBy', 'name userName');
        if(!package) {
            return res.status(404).json({
                message : 'Package not found'
            });
        }
        
        res.status(201).json(package);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message : 'Internal server Error'
        })
    }
}

const updatePackage = async(req, res) => {
    try {
        const updatePackage = await Package.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('products createdBy', 'name userName');
        res.status(200).json(updatePackage);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}

const deletePackage = async(req, res) => {
    try {
        const deletePackage = await Package.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message : 'Package Deleted Successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
}


module.exports = {
    addNewPackage,
    getAllPackages,
    viewSpecificPackage,
    updatePackage,
    deletePackage
}