const express = require('express');
const { addCustomer } = require('../controllers/customerController');
const { verifyToken } = require('../middleware/jwtMiddleware');
const router = express.Router();

router.get('/addCustomer',verifyToken, addCustomer )

module.exports = router;