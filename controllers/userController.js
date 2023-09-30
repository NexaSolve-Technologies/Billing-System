const User = require("../models/User");

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Sever Error'});
    }
}

module.exports = {
    getUserProfile
}