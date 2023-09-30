const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/jwtMiddleware');

router.post('/getUserProfile', verifyToken, getUserProfile );

module.exports = router;