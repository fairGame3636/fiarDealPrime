const express = require('express');
const router = express.Router();
const { getAllTables, getTableById } = require('../controllers/table.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, getAllTables);
router.get('/:id', auth, getTableById);

module.exports = router; 