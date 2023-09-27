const Joi = require('joi');

// Validate user Registration Data :-
exports.validateRegisterationData = (req, res, next) => {
    const schema = Joi.object({
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        userName : Joi.string().required(),
        phone : Joi.number().required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required(),
        address : Joi.string().required()
    });
    
    const {error} = schema.validate(req.body);
    
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    
    next()
}
