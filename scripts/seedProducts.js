/**
 * Seed 25 products with images from ProductImages folder
 * Run: node scripts/seedProducts.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const path = require('path');
const Product = require('../models/Product');
const { uploadToImgBB } = require('../utils/imgbbUpload');

const IMAGES_DIR = path.join(__dirname, '..', '..', 'ProductImages');

// 25 products across 9 categories (tshirts, sweatshirts, caps, bags, mugs, cards, printing, uniforms, gifts)
const productsData = [
  // --- T-Shirts (4) ---
  {
    name: 'Classic Round Neck Tee',
    title: 'Premium Cotton Round Neck T-Shirt - Customizable Print',
    description: 'High-quality 100% combed cotton round neck t-shirt perfect for custom printing. Soft, breathable fabric with reinforced stitching for long-lasting wear. Available in multiple sizes and colors.',
    category: 'tshirts',
    price: 349,
    stock: 200,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Red', 'Gray'],
    bestSeller: true,
    featured: true,
    rating: 4.5,
    reviews: 128,
    mainImage: 'Product_1 (1).png',
    subImageFiles: ['Product_1 (2).png'],
  },
  {
    name: 'Polo Collar T-Shirt',
    title: 'Custom Embroidered Polo T-Shirt - Corporate & Casual Wear',
    description: 'Professional polo collar t-shirt ideal for corporate branding and casual events. Features a classic collar design with custom embroidery options. Made from premium pique cotton.',
    category: 'tshirts',
    price: 499,
    stock: 150,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Blue', 'Green', 'Maroon'],
    newArrival: true,
    rating: 4.3,
    reviews: 76,
    mainImage: 'Product_2 (1).png',
    subImageFiles: ['Product_2 (2).png', 'Product_2 (3).png'],
  },
  {
    name: 'V-Neck Sports Tee',
    title: 'Dry-Fit V-Neck Sports T-Shirt with Custom Print',
    description: 'Moisture-wicking dry-fit v-neck t-shirt designed for active wear. Lightweight, quick-dry fabric with sublimation-ready surface for vibrant full-color prints.',
    category: 'tshirts',
    price: 399,
    stock: 180,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Blue', 'Orange'],
    trending: true,
    rating: 4.2,
    reviews: 54,
    mainImage: 'Product_3 (1).png',
    subImageFiles: ['Product_3 (2).png', 'Product_3 (3).png'],
  },
  {
    name: 'Oversized Drop Shoulder Tee',
    title: 'Oversized Drop Shoulder T-Shirt - Streetwear Custom Print',
    description: 'Trendy oversized drop shoulder t-shirt with a relaxed fit. Perfect for streetwear-style custom prints and designs. Made from 240 GSM heavy cotton.',
    category: 'tshirts',
    price: 549,
    stock: 120,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Beige', 'Olive'],
    newArrival: true,
    featured: true,
    rating: 4.7,
    reviews: 42,
    mainImage: 'Product_4 (1).png',
    subImageFiles: ['Product_4 (2).png', 'Product_4 (3).png'],
  },

  // --- Sweatshirts (3) ---
  {
    name: 'Classic Hoodie Sweatshirt',
    title: 'Premium Fleece Hoodie - Custom Printed Pullover Sweatshirt',
    description: 'Cozy fleece-lined hoodie sweatshirt with kangaroo pocket and adjustable drawstring hood. Ideal for custom screen printing and embroidery. 300 GSM terry cotton blend.',
    category: 'sweatshirts',
    price: 899,
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Maroon'],
    bestSeller: true,
    rating: 4.6,
    reviews: 95,
    mainImage: 'Product_5 (1).png',
    subImageFiles: ['Product_5 (2).png'],
  },
  {
    name: 'Crew Neck Sweatshirt',
    title: 'Custom Crew Neck Sweatshirt - Unisex Comfort Fit',
    description: 'Unisex crew neck sweatshirt made from premium french terry fabric. Features ribbed cuffs and hem for a snug fit. Perfect for embroidery and heat transfer prints.',
    category: 'sweatshirts',
    price: 749,
    stock: 130,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray', 'Teal'],
    trending: true,
    rating: 4.4,
    reviews: 68,
    mainImage: 'Product_6 (1).png',
    subImageFiles: ['Product_6 (2).png', 'Product_6 (3).png'],
  },
  {
    name: 'Zip-Up Jacket Hoodie',
    title: 'Full Zip Hoodie Jacket - Custom Logo Embroidered',
    description: 'Full-zip hoodie jacket with split kangaroo pockets and durable YKK zipper. Perfect for corporate teams and events. Heavy-weight fleece for warmth and comfort.',
    category: 'sweatshirts',
    price: 1099,
    stock: 80,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray'],
    newArrival: true,
    rating: 4.8,
    reviews: 37,
    mainImage: 'Product_7 (1).png',
    subImageFiles: ['Product_7 (2).png', 'Product_7 (3).png'],
  },

  // --- Caps (3) ---
  {
    name: 'Classic Baseball Cap',
    title: 'Custom Embroidered Baseball Cap - Adjustable Snapback',
    description: 'Premium quality baseball cap with structured front panels and adjustable snapback closure. Perfect for custom embroidery with your logo or design. One size fits most.',
    category: 'caps',
    price: 249,
    stock: 300,
    sizes: ['Free Size'],
    colors: ['Black', 'White', 'Navy', 'Red', 'Green'],
    bestSeller: true,
    featured: true,
    rating: 4.4,
    reviews: 156,
    mainImage: 'Product_8 (1).png',
    subImageFiles: ['Product_8 (2).png', 'Product_8 (3).png'],
  },
  {
    name: 'Trucker Mesh Cap',
    title: 'Custom Trucker Cap with Mesh Back - Breathable Design',
    description: 'Classic trucker cap with breathable mesh back panels and foam front. Snap closure for adjustable fit. Ideal for outdoor events and promotional use.',
    category: 'caps',
    price: 199,
    stock: 250,
    sizes: ['Free Size'],
    colors: ['Black', 'White', 'Red', 'Blue'],
    mostPopular: true,
    rating: 4.1,
    reviews: 89,
    mainImage: 'Product_9 (1).png',
    subImageFiles: ['Product_9 (2).png', 'Product_9 (3).png'],
  },
  {
    name: 'Flat Brim Snapback',
    title: 'Flat Brim Snapback Cap - Urban Style Custom Print',
    description: 'Urban-style flat brim snapback cap with high-quality embroidery panel. Features a structured crown and adjustable snap closure. Perfect for streetwear brands.',
    category: 'caps',
    price: 299,
    stock: 180,
    sizes: ['Free Size'],
    colors: ['Black', 'White', 'Navy', 'Red'],
    newArrival: true,
    rating: 4.3,
    reviews: 45,
    mainImage: 'Product_10 (1).png',
    subImageFiles: ['Product_10 (2).png', 'Product_10 (3).png'],
  },

  // --- Bags (3) ---
  {
    name: 'Canvas Tote Bag',
    title: 'Custom Printed Canvas Tote Bag - Eco-Friendly Shopping Bag',
    description: 'Durable canvas tote bag made from 12oz natural cotton canvas. Spacious interior with reinforced handles. Perfect for custom screen printing and eco-friendly branding.',
    category: 'bags',
    price: 199,
    stock: 400,
    sizes: ['Free Size'],
    colors: ['White', 'Black', 'Beige'],
    bestSeller: true,
    rating: 4.5,
    reviews: 203,
    mainImage: 'Product_11 (1).png',
    subImageFiles: ['Product_11 (2).png', 'Product_11 (3).png'],
  },
  {
    name: 'Laptop Backpack',
    title: 'Custom Logo Laptop Backpack - Professional Business Bag',
    description: 'Professional laptop backpack with padded compartment fitting up to 15.6" laptops. Multiple organizer pockets, water-resistant material, and comfortable padded straps. Custom embroidery ready.',
    category: 'bags',
    price: 1299,
    stock: 60,
    sizes: ['Free Size'],
    colors: ['Black', 'Gray', 'Navy'],
    featured: true,
    rating: 4.6,
    reviews: 72,
    mainImage: 'Product_12 (1).png',
    subImageFiles: ['Product_12 (2).png', 'Product_12 (3).png'],
  },
  {
    name: 'Drawstring Sports Bag',
    title: 'Custom Drawstring Bag - Lightweight Sports & Gym Bag',
    description: 'Lightweight drawstring bag perfect for sports, gym, and events. Made from durable polyester with reinforced corners. Large print area for vibrant custom designs.',
    category: 'bags',
    price: 149,
    stock: 500,
    sizes: ['Free Size'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green'],
    trending: true,
    rating: 4.0,
    reviews: 134,
    mainImage: 'Product_13 (1).png',
    subImageFiles: ['Product_13 (2).png', 'Product_13 (3).png'],
  },

  // --- Mugs (3) ---
  {
    name: 'Classic Ceramic Mug',
    title: 'Custom Printed Ceramic Mug - 330ml White Coffee Mug',
    description: 'Premium white ceramic mug with a glossy finish perfect for sublimation printing. Dishwasher and microwave safe. 330ml capacity with comfortable C-handle.',
    category: 'mugs',
    price: 199,
    stock: 500,
    sizes: ['330ml'],
    colors: ['White'],
    bestSeller: true,
    mostPopular: true,
    rating: 4.3,
    reviews: 245,
    mainImage: 'Product_14 (1).png',
    subImageFiles: ['Product_14 (2).png'],
  },
  {
    name: 'Magic Color Change Mug',
    title: 'Heat Sensitive Magic Mug - Custom Photo Reveal Mug',
    description: 'Heat-sensitive color changing mug that reveals your custom design when hot liquid is added. Matte black when cold, your design appears when hot. A unique personalized gift.',
    category: 'mugs',
    price: 349,
    stock: 200,
    sizes: ['330ml'],
    colors: ['Black'],
    featured: true,
    newArrival: true,
    rating: 4.7,
    reviews: 89,
    mainImage: 'Product_15 (1).png',
    subImageFiles: ['Product_15 (2).png', 'Product_15 (3).png'],
  },
  {
    name: 'Travel Tumbler Mug',
    title: 'Insulated Travel Tumbler - Custom Engraved Stainless Steel',
    description: 'Double-wall insulated stainless steel travel tumbler. Keeps drinks hot for 6 hours or cold for 12 hours. Custom laser engraving for a premium, permanent finish. 450ml capacity.',
    category: 'mugs',
    price: 599,
    stock: 150,
    sizes: ['450ml'],
    colors: ['Silver', 'Black', 'White', 'Blue'],
    trending: true,
    rating: 4.5,
    reviews: 56,
    mainImage: 'Product_16 (1).png',
    subImageFiles: ['Product_16 (2).png', 'Product_16 (3).png'],
  },

  // --- Business Cards (2) ---
  {
    name: 'Premium Business Cards',
    title: 'Custom Premium Business Cards - 350 GSM Matte Laminated',
    description: 'Professional business cards printed on 350 GSM art card with matte lamination on both sides. Full-color printing with sharp details. Minimum order: 100 cards.',
    category: 'cards',
    price: 299,
    stock: 1000,
    sizes: ['Standard 3.5x2 inch'],
    colors: [],
    bestSeller: true,
    minOrderQuantity: 100,
    rating: 4.6,
    reviews: 312,
    mainImage: 'Product18 (1).png',
    subImageFiles: ['Product18 (2).png', 'Product18 (3).png'],
  },
  {
    name: 'Luxury Textured Cards',
    title: 'Luxury Textured Business Cards - Spot UV & Gold Foil',
    description: 'Ultra-premium business cards with textured cotton finish, spot UV coating, and optional gold/silver foil stamping. Make a lasting impression. 400 GSM thick stock.',
    category: 'cards',
    price: 799,
    stock: 500,
    sizes: ['Standard 3.5x2 inch'],
    colors: [],
    featured: true,
    newArrival: true,
    minOrderQuantity: 50,
    rating: 4.9,
    reviews: 67,
    mainImage: 'product19 (1).png',
    subImageFiles: ['product19 (2).png', 'product19 (3).png'],
  },

  // --- Printing (2) ---
  {
    name: 'Vinyl Banner Print',
    title: 'Custom Vinyl Banner - Full Color Large Format Print',
    description: 'Durable vinyl banner with full-color digital printing. Weather-resistant and UV-protected for indoor and outdoor use. Includes grommets for easy hanging. Custom sizes available.',
    category: 'printing',
    price: 499,
    stock: 200,
    sizes: ['3x2 ft', '4x3 ft', '6x3 ft', '8x4 ft'],
    colors: [],
    mostPopular: true,
    rating: 4.2,
    reviews: 98,
    mainImage: 'product20 (1).png',
    subImageFiles: ['product20 (2).png', 'product20 (3).png'],
  },
  {
    name: 'Custom Sticker Sheets',
    title: 'Custom Die-Cut Stickers - Waterproof Vinyl Sticker Printing',
    description: 'High-quality die-cut stickers printed on waterproof vinyl with strong adhesive backing. Scratch-resistant and fade-proof. Perfect for branding, packaging, and promotions.',
    category: 'printing',
    price: 199,
    stock: 800,
    sizes: ['2 inch', '3 inch', '4 inch'],
    colors: [],
    trending: true,
    newArrival: true,
    minOrderQuantity: 50,
    rating: 4.4,
    reviews: 176,
    mainImage: 'product21 (1).png',
    subImageFiles: ['product21 (2).png', 'product21 (3).png'],
  },

  // --- Uniforms (3) ---
  {
    name: 'Corporate Uniform Shirt',
    title: 'Custom Corporate Uniform Shirt - Professional Office Wear',
    description: 'Professional corporate uniform shirt with custom embroidered logo. Wrinkle-resistant poly-cotton blend. Perfect for offices, hospitality, and retail teams.',
    category: 'uniforms',
    price: 699,
    stock: 150,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Gray', 'Black'],
    bestSeller: true,
    rating: 4.5,
    reviews: 84,
    mainImage: 'product22 (1).png',
    subImageFiles: ['product22 (2).png', 'product22 (3).png'],
  },
  {
    name: 'Industrial Work Uniform',
    title: 'Heavy Duty Work Uniform Set - Custom Branded Workwear',
    description: 'Durable industrial work uniform with custom branding. Reinforced stitching, multiple utility pockets, and stain-resistant fabric. Suitable for factories, warehouses, and construction.',
    category: 'uniforms',
    price: 1499,
    stock: 80,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Gray', 'Black', 'Orange'],
    featured: true,
    rating: 4.3,
    reviews: 41,
    mainImage: 'product23 (1).png',
    subImageFiles: ['product23 (2).png'],
  },
  {
    name: 'School Uniform Set',
    title: 'Custom School Uniform - Complete Set with Logo Embroidery',
    description: 'Complete school uniform set including shirt and trousers/skirt with custom school logo embroidery. Durable, comfortable, and easy-care fabric designed for everyday wear.',
    category: 'uniforms',
    price: 899,
    stock: 200,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Gray'],
    newArrival: true,
    rating: 4.4,
    reviews: 63,
    mainImage: 'Product 24 (1).png',
    subImageFiles: ['Product 24 (2).png', 'Product 24 (3).png'],
  },

  // --- Gifts (2) ---
  {
    name: 'Photo Frame Gift Set',
    title: 'Personalized Photo Frame - Custom Printed Wooden Frame',
    description: 'Beautifully crafted wooden photo frame with custom UV printing on the frame border. Perfect for personal gifts, corporate giveaways, and commemorative events.',
    category: 'gifts',
    price: 449,
    stock: 120,
    sizes: ['6x4 inch', '8x6 inch', '10x8 inch'],
    colors: ['Brown', 'Black', 'White'],
    bestSeller: true,
    mostPopular: true,
    rating: 4.6,
    reviews: 143,
    mainImage: 'Product 25 (1).png',
    subImageFiles: ['Product 25 (2).png', 'Product 25 (3).png'],
  },
  {
    name: 'Custom Keychain Set',
    title: 'Personalized Metal Keychain - Laser Engraved Custom Gift',
    description: 'Premium metal keychain with custom laser engraving. Available in various shapes - rectangle, circle, heart. Comes in a gift box. Minimum order 10 pieces for custom designs.',
    category: 'gifts',
    price: 149,
    stock: 500,
    sizes: ['Free Size'],
    colors: ['Silver', 'Gold', 'Black'],
    trending: true,
    newArrival: true,
    minOrderQuantity: 10,
    rating: 4.2,
    reviews: 198,
    mainImage: 'Product 26 (1).png',
    subImageFiles: ['Product 26 (2).png'],
  },
];

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log(`\nUploading images and creating ${productsData.length} products...\n`);

    let created = 0;
    let failed = 0;

    for (let i = 0; i < productsData.length; i++) {
      const data = productsData[i];
      const { mainImage, subImageFiles, ...productFields } = data;

      try {
        // Upload main image
        const mainImagePath = path.join(IMAGES_DIR, mainImage);
        console.log(`[${i + 1}/${productsData.length}] Uploading main image for "${data.name}"...`);
        const imageUrl = await uploadToImgBB(mainImagePath, 'file');

        // Upload sub-images
        const subImages = [];
        for (const subImg of subImageFiles) {
          const subImgPath = path.join(IMAGES_DIR, subImg);
          console.log(`  Uploading sub-image: ${subImg}...`);
          try {
            const subUrl = await uploadToImgBB(subImgPath, 'file');
            subImages.push(subUrl);
          } catch (err) {
            console.log(`  Warning: Failed to upload sub-image ${subImg}: ${err.message}`);
          }
          // Small delay to avoid rate limiting
          await new Promise(r => setTimeout(r, 500));
        }

        // Create product
        const product = await Product.create({
          ...productFields,
          image: imageUrl,
          subImages,
          isActive: true,
        });

        console.log(`  Created: ${product.name} (${product.category}) - ID: ${product._id}\n`);
        created++;

        // Delay between products to avoid ImgBB rate limiting
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error(`  FAILED: ${data.name} - ${err.message}\n`);
        failed++;
      }
    }

    console.log(`\n=== Seed Complete ===`);
    console.log(`Created: ${created}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${productsData.length}`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seedProducts();
