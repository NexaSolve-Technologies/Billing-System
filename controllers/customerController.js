const Customer = require("../models/Customer");

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
            return res.status(200).json({
                message : 'Customer already exists in DataBase'
            })
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

module.exports = {
    addCustomer
}