const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/adminRouter', async (req, res) =>{
    const { firstName, lastName, userName, phone, email, password, address} = req.body;
    
    // Check if the user already exists :-
    const existingUser = await User.findOne({userName});
    if(existingUser){
        return res.status(400).json({
            message : 'Username already exists.'
        })
    }
    
    const userId = await User.countDocuments({});
    
    // Create new Admin user
    const newAdmin = new User({
        firstName,
        lastName,
        userName,
        userId : userId + 1,
        phone,
        email,
        password,
        address,
        role : 'admin'
    })
    

    // Save the new Admin user to the Database :-
    try {
        await newAdmin.save();
        res.status(201).json({
            message : 'Admin Registered Successfully.'
        });
    } catch (err) {
        res.status(500).json({
            message : "Couldn't register the user something went wrong on server side.", error : err
        });
    }
})


module.exports = router;