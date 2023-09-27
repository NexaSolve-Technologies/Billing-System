const secretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const generateToken = (payload ) => {
    return jwt.sign(payload, secretKey);
};

module.exports = {
    secretKey,
    generateToken
}