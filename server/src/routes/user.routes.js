const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/me', auth, getMe);

module.exports = router; 