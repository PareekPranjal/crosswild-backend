const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats,
} = require('../controllers/orderController');

// Public routes
router.post('/', createOrder);

// Admin routes
router.get('/', getAllOrders);
router.get('/stats', getOrderStats);
router.get('/:id', getOrder);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
