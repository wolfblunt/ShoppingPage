const express = require('express');
const { getOrders } = require('../controllers/orderController');

const router = express.Router();
// Orders API endpoint
router.get('/', getOrders);

module.exports = router;
