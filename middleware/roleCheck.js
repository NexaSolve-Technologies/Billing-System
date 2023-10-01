const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
        const inputRole = req.user.role;
        
        if(!inputRole || !allowedRoles.includes(inputRole)) {
            return res.status(403).json({ message : 'Access Denied'});
        }
        next();
    }
        
}

module.exports = {
    roleCheck
}