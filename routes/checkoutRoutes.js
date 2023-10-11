const express = require('express');
const { addCustomer, addPurchase, addSales } = require('../controllers/checkoutController');
const { verifyToken } = require('../middleware/jwtMiddleware');
const router = express.Router();

router.post('/addCustomer',verifyToken, addCustomer );
router.post('/addPurchase', verifyToken, addPurchase);
router.post('/addSales', verifyToken, addSales);

module.exports = router;