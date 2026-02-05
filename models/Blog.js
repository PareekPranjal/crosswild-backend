const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
  },
  paragraph: {
    type: String,
    required: [true, 'Blog content is required'],
  },
  image: {
    type: String,
    required: [true, 'Blog image is required'],
  },
  author: {
    name: {
      type: String,
      required: [true, 'Author name is required'],
    },
    image: {
      type: String,
      default: '/images/blog/author-default.png',
    },
    designation: {
      type: String,
      default: 'Content Writer',
    },
  },
  tags: [{
    type: String,
  }],
  publishDate: {
    type: String,
    default: () => new Date().getFullYear().toString(),
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  // SEO fields
  seo: {
    title: {
      type: String,
      maxlength: 70,
    },
    description: {
      type: String,
      maxlength: 160,
    },
    keywords: [{
      type: String,
    }],
    ogImage: {
      type: String,
    },
    canonicalUrl: {
      type: String,
    },
  },
}, {
  timestamps: true,
});

// Index for better search performance
blogSchema.index({ title: 'text', paragraph: 'text' });
blogSchema.index({ tags: 1, publishDate: -1 });

module.exports = mongoose.model('Blog', blogSchema);
