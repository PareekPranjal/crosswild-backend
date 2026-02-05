const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} = require('../controllers/productController');

// Public routes
router.get('/', getAllProducts);
router.get('/stats', getProductStats);
router.get('/:id', getProduct);

// Admin routes (add auth middleware in production)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
