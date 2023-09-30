const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    // Checking if Token Exists :-
    if(!token) {
        return res.status(401).json({message : 'Access Denied : No token provided'});
    }
    
    try {
        const decoded = jwt.verify(token, secretKey);
        
        // Add user from payload to different object
        req.user = decoded;
        
        next();
        
    } catch (err) {
        console.log(err);
        res.status(400).json({ message : 'Invalid Token'})
    }
    
}

module.exports = {
    verifyToken
}
