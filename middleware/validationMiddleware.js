const Joi = require('joi');

// Validate user Registration Data :-
const validateRegisterationData = (req, res, next) => {
    const schema = Joi.object({
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        userName : Joi.string().required(),
        role : Joi.string(),
        phone : Joi.number().required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required()
    });
    
    const {error} = schema.validate(req.body);
    
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    
    next()
}

const validateLoginData = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    
    const {error} = schema.validate(req.body);
    
    if(error) {
        return res.status(400).json({
            message : error.details[0].message
        });
    }
    next();
}

module.exports = {
    validateRegisterationData,
    validateLoginData
}