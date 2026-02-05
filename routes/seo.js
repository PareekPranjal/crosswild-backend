const express = require('express');
const router = express.Router();
const {
  getGlobalSEO,
  updateGlobalSEO,
  getAllPageSEO,
  getPageSEO,
  createOrUpdatePageSEO,
  deletePageSEO,
  generateSitemap,
  getRobotsTxt,
  getSEOStats,
} = require('../controllers/seoController');

// Public routes
router.get('/global', getGlobalSEO);
router.get('/pages', getAllPageSEO);
router.get('/pages/:path', getPageSEO);
router.get('/sitemap.xml', generateSitemap);
router.get('/robots.txt', getRobotsTxt);

// Admin routes (should be protected in production)
router.put('/global', updateGlobalSEO);
router.post('/pages', createOrUpdatePageSEO);
router.delete('/pages/:id', deletePageSEO);
router.get('/stats', getSEOStats);

module.exports = router;
