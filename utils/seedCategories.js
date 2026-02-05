require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

const categories = [
  { id: 'tshirts', name: 'T-Shirts', icon: '👕', description: 'Custom printed t-shirts' },
  { id: 'sweatshirts', name: 'Sweatshirts', icon: '🧥', description: 'Comfortable sweatshirts' },
  { id: 'caps', name: 'Caps', icon: '🧢', description: 'Stylish caps and hats' },
  { id: 'bags', name: 'Bags', icon: '🎒', description: 'Custom bags and totes' },
  { id: 'mugs', name: 'Mugs', icon: '☕', description: 'Personalized mugs' },
  { id: 'cards', name: 'Business Cards', icon: '💳', description: 'Professional business cards' },
  { id: 'printing', name: 'Printing', icon: '🖨️', description: 'Various printing services' },
  { id: 'uniforms', name: 'Uniforms', icon: '👔', description: 'Corporate and school uniforms' },
  { id: 'gifts', name: 'Gifts', icon: '🎁', description: 'Custom gift items' },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories');

    // Insert new categories
    await Category.insertMany(categories);
    console.log(`✅ Seeded ${categories.length} categories`);

    console.log('\n📋 Categories:');
    categories.forEach(cat => {
      console.log(`   ${cat.icon} ${cat.name} (${cat.id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedCategories();
