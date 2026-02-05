# The CrossWild Backend API

Complete backend server built with Node.js, Express, MongoDB, and ImgBB for The CrossWild e-commerce platform.

---

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **ImgBB Integration** for image uploads
- **CORS** enabled for cross-origin requests
- **Security** with Helmet.js
- **Compression** for optimized responses
- **Error Handling** with proper HTTP status codes
- **Logging** with Morgan

---

## 📦 Installation

1. Navigate to backend folder:
\`\`\`bash
cd backend
\`\`\`

2. Dependencies are already installed. If needed:
\`\`\`bash
npm install
\`\`\`

3. Configure environment variables in \`.env\`:
\`\`\`env
PORT=5000
NODE_ENV=development
MONGODB_URI=your-mongodb-connection-string
IMGBB_API_KEY=your-imgbb-api-key
JWT_SECRET=your-secret-key
\`\`\`

4. Start the server:
\`\`\`bash
npm run dev
\`\`\`

---

## 🔐 MongoDB Setup

**IMPORTANT:** Update your MongoDB credentials in \`.env\`:

\`\`\`env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/thecrosswild?retryWrites=true&w=majority
\`\`\`

Replace:
- \`USERNAME\` with your MongoDB Atlas username
- \`PASSWORD\` with your MongoDB Atlas password (URL encoded)
- \`cluster\` with your cluster name

---

## 📚 API Endpoints

### Products

- \`GET /api/products\` - Get all products
  - Query params: category, bestSeller, newArrival, featured, trending, mostPopular, search, page, limit
- \`GET /api/products/:id\` - Get single product
- \`POST /api/products\` - Create product
- \`PUT /api/products/:id\` - Update product
- \`DELETE /api/products/:id\` - Delete product
- \`GET /api/products/stats\` - Get product statistics

### Blogs

- \`GET /api/blogs\` - Get all blogs
- \`GET /api/blogs/:id\` - Get single blog
- \`POST /api/blogs\` - Create blog
- \`PUT /api/blogs/:id\` - Update blog
- \`DELETE /api/blogs/:id\` - Delete blog
- \`GET /api/blogs/stats\` - Get blog statistics

### Orders

- \`GET /api/orders\` - Get all orders
- \`GET /api/orders/:id\` - Get single order
- \`POST /api/orders\` - Create order
- \`PUT /api/orders/:id/status\` - Update order status
- \`DELETE /api/orders/:id\` - Delete order
- \`GET /api/orders/stats\` - Get order statistics

### Upload

- \`POST /api/upload\` - Upload image file
- \`POST /api/upload/base64\` - Upload base64 image

---

## 🎯 Usage

### Start Server:
\`\`\`bash
npm run dev
\`\`\`

Server runs on: http://localhost:5000

### Seed Categories:
\`\`\`bash
node utils/seedCategories.js
\`\`\`

---

## 📞 Support

Email: info@thecrosswild.com
Phone: +91 98765 43210

---

**Built with Node.js + Express + MongoDB**
