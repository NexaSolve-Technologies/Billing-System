const User = require("../models/User");
const bcrypt = require('bcrypt');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Sever Error'});
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, { new : true});
        res.status(201).json(updateUser);
    } catch (err) {
        console.log(err);        
        res.status(500).send('Internal Server Error');
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(res.user.id);
        res.status(200).json({message : 'Account deleted.'})
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const changeUserPassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const {oldPassword, newPassword} = req.body;
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
       
        if(!isValidPassword) {
            return res.status(401).json({message : 'Invalid old Password'})
        }
        
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newPassword, salt);
        user.password = encryptedPassword;
        await user.save();
        
        res.status(201).json({message : 'Password changed Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

const listAllUsers = async (req, res)=> {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const viewUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user) {
            return res.status(400).json({ message : 'User Not found'});
        } 
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const deleteSpecificUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email : req.body.email})
        if(!user) {
            return res.status(400).json({ message : 'User not found'});
        }
        
        res.status(200).json('Account Deleted');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    listAllUsers,
    viewUserProfile,
    deleteSpecificUser
}