const Service = require("../models/Service");

const addNewService = async (req, res) => {
    try {

    const {name, price, description} = req.body;
    createdBy = req.user.id;
    
    const newService = await Service.create({
        name,
        price,
        description,
        createdBy
    });
        
    res.status(201).json(newService);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

const getAllServices = async (req, res) => {
    try {
        const Services = await Service.find();
        res.status(201).json(Services);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}

module.exports = {
    addNewService,
    getAllServices
}