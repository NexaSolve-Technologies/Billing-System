const User = require('../models/User');
const { generateToken } = require('../config/jwtConfig')
const bycrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        // Get User Input :-
        const {firstName, lastName, userName, phone, email, password, address} = req.body;

        // Validation of UserInput has been done in Middlewares part :-
        
        // Check if user Already Exists :-
        const oldUser = await User.findOne({email});
        if(oldUser) {
            return res.status(404).json({message : "User Already exists"});
        }
        
        // Encrypting user Password :-
        const salt = await bycrypt.genSalt(10)
        const EncryptedPassword = await bycrypt.hash(password, salt)
        
        // Creating a random userID everytime :-
        const count = await User.countDocuments();
        const userID = count + 1;

        // Creating new user in the database :-
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            phone,
            userId : userID,
            email : email.toLowerCase(),
            password : EncryptedPassword,
            address,
        })

        const token = generateToken({ user_id : User._id, userName});
        
        res.status(201).json({message : 'UserCreated', password : EncryptedPassword, tokenn : token})
    } catch (error){
        console.log("Error :", error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports = {
    register,
}