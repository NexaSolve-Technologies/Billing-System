const express = require('express');
const { addNewPackage, getAllPackages, viewSpecificPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { verifyToken } = require('../middleware/jwtMiddleware');
const { roleCheck } = require('../middleware/roleCheck');
const upload = require('../middleware/imageUploadMiddleware');
const router = express.Router();

router.post('/addNewPackage', verifyToken, roleCheck(['admin', 'Master']) ,addNewPackage);
router.get('/getAllPackages',verifyToken, getAllPackages);
router.get('/viewSpecificPackage/:id', verifyToken, viewSpecificPackage);
router.put('/updatePackage/:id', verifyToken, roleCheck(['admin', 'Master']), updatePackage);
router.delete('/deletePackage/:id', verifyToken, roleCheck(['admin', 'Master']), deletePackage);

module.exports = router;