const express = require('express');
const router = express.Router();
const {
  getAllProductTypes,
  getProductType,
  createProductType,
  updateProductType,
  deleteProductType,
  seedProductTypes,
} = require('../controllers/productTypeController');

// Public routes
router.get('/', getAllProductTypes);
router.get('/:id', getProductType);

// Admin routes (add auth middleware in production)
router.post('/', createProductType);
router.post('/seed', seedProductTypes);
router.put('/:id', updateProductType);
router.delete('/:id', deleteProductType);

module.exports = router;
