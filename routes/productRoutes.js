const express = require('express');
const { addNewProduct, listAllProducts, viewSpecificProduct, EditProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken } = require('../middleware/jwtMiddleware');
const { roleCheck } = require('../middleware/roleCheck');
const router = express.Router();

router.post('/addNewProduct',verifyToken, roleCheck(['admin', 'Master']), addNewProduct);
router.get('/listAllProducts',verifyToken, listAllProducts);
router.get('/viewSpecificProduct/:id', viewSpecificProduct);
router.put('/editProduct/:id', verifyToken, roleCheck(['admin', 'Master']), EditProduct);
router.delete('/deleteProduct/:id', verifyToken, roleCheck(['admin', 'Master']), deleteProduct);

module.exports = router;