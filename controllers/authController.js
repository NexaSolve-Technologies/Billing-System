const User = require('../models/User');
const { generateToken } = require('../config/jwtConfig')
const bycrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        // Get User Input :-
        const {firstName, lastName, userName, role, phone, email, password, address} = req.body;

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
        const userID = Math.floor(Math.random()*100000);

        // Creating new user in the database :-
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            role,
            phone,
            userId : userID,
            email : email.toLowerCase(),
            password : EncryptedPassword,
            address,
        })

        const token = generateToken({ id : newUser._id, email : newUser.email, role : newUser.role });
        
        res.status(201).json({message : 'UserCreated', tokenn : token})
    } catch (error){
        console.log("Error :", error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        // Check if user Exists :-
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message : "Invalid Email or password."});
        };
        
        // Check Password :-
        const validPassword = await bycrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(401).json({message : "Invalid Email or Password."})
        }
        
        // Generate Token :-
        const token = generateToken({id : user._id, email : user.email, role : user.role})
        
        // Send back the token :-
        res.status(200).json({
            message : "Logged in Successfully",
            token
        })
    } catch (err) {
        console.log(error);
        res.status(500).json({ message : "Internal Server Error."})
    }
}

module.exports = {
    register,
    login
}