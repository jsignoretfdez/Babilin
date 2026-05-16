const express = require('express');
const router = express.Router();
const { login, getMe, getUsers } = require('../controllers/authController');
const { auth, isAdmin } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/me', auth, getMe);
router.get('/users', auth, isAdmin, getUsers);

module.exports = router;
