const express =  require('express');
const { verifyToken } = require('../middleware/jwtMiddleware');
const { addNewService, getAllServices } = require('../controllers/serviceController');
const router = express.Router();

router.post('/addNewService', verifyToken, addNewService);
router.get('/getAllServices', verifyToken, getAllServices);

module.exports = router;