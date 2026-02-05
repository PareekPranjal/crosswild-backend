const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  title: {
    type: String,
    trim: true,
    default: '',
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  minOrderQuantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  // Reference to ProductType for dynamic type info
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductType',
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  subImages: [{
    type: String,
  }],
  sizes: [{
    type: String,
  }],
  colors: [{
    type: String,
  }],
  // Dynamic details based on product type (key-value pairs)
  details: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  newArrival: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  mostPopular: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
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
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, bestSeller: 1, newArrival: 1, featured: 1 });

module.exports = mongoose.model('Product', productSchema);
