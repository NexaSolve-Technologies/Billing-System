const express = require('express');
const router = express.Router();
const { validateRegisterationData } = require('../middleware/validationMiddleware')
const authController = require('../controllers/authController');

router.post('/register', validateRegisterationData, authController.register);


module.exports = router;