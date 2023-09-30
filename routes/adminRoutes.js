const express = require('express');
const router = express.Router();
const { validateRegisterationData, validateLoginData } = require('../middleware/validationMiddleware')
const {login, register} = require('../controllers/authController')

router.post('/register', validateRegisterationData, register);
router.post('/login', validateLoginData, login );


module.exports = router;