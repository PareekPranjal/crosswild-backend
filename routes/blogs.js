const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogStats,
} = require('../controllers/blogController');

// Public routes
router.get('/', getAllBlogs);
router.get('/stats', getBlogStats);
router.get('/:id', getBlog);

// Admin routes
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
