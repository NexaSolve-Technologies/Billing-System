const  Product  = require('../models/Product');

const addNewProduct = async (req, res) => {
    try {
        const { name, price, category, description, images, stock, isAvailable } = req.body;
        
        const count = await Product.countDocuments();
        const productID = count + 1;
        
        const newProduct = await Product.create({
            name,
            price,
            category,
            description,
            productId : productID,
            images,
            stock,
            isAvailable
        })
        res.json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const listAllProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(201).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server Error');
    }
}

const viewSpecificProduct = async (req, res) => {
    try {
        const productID = parseInt(req.params.id);
        const product = await Product.findOne({ productId : productID});
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const EditProduct = async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true});
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message : 'Product Deleted', item : deletedProduct});
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

// Search Products is remaining :-

module.exports = {
    addNewProduct,
    listAllProducts,
    viewSpecificProduct,
    EditProduct,
    deleteProduct
}