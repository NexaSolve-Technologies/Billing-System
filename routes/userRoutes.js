const express = require('express');
const router = express.Router();

const { getUserProfile, updateUserProfile, deleteUserProfile, changeUserPassword, listAllUsers, viewUserProfile, deleteSpecificUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/jwtMiddleware');
const { roleCheck } = require('../middleware/roleCheck');

router.get('/getUserProfile', verifyToken, getUserProfile );
router.put('/updateUserProfile', verifyToken, updateUserProfile);
router.delete('/deleteUser', verifyToken, deleteUserProfile);
router.put('/changeUserPassword', verifyToken, changeUserPassword);
router.get('/listAllUsers', verifyToken , roleCheck('Master'), listAllUsers );
router.get('/viewUserProfile', verifyToken, roleCheck('Master'), viewUserProfile);
router.delete('/deleteSpecificUser', verifyToken, roleCheck('Master'), deleteSpecificUser);

module.exports = router;