# Quick Start Commands

All commands needed to run The CrossWild project.

---

## 🔧 Initial Setup (One Time)

### 1. Fix MongoDB Credentials

```bash
cd /Users/adrologic/Movies/Crosswild/backend
nano .env
```

Update this line:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@thecrosswild.j8lzvdi.mongodb.net/thecrosswild?retryWrites=true&w=majority
```

### 2. Seed Categories

```bash
cd /Users/adrologic/Movies/Crosswild/backend
node utils/seedCategories.js
```

---

## 🚀 Start All Services

### Terminal 1: Backend (Port 5000)

```bash
cd /Users/adrologic/Movies/Crosswild/backend
npm run dev
```

**Or use the script:**
```bash
cd /Users/adrologic/Movies/Crosswild/backend
./START_BACKEND.sh
```

### Terminal 2: Admin Panel (Port 5173)

```bash
cd /Users/adrologic/Movies/Crosswild/admin
npm run dev
```

**Or use the script:**
```bash
cd /Users/adrologic/Movies/Crosswild/admin
./START_ADMIN.sh
```

### Terminal 3: Main Website (Port 3000)

```bash
cd /Users/adrologic/Movies/Crosswild/TheCrossWild
npm run dev
```

---

## 🌐 Access URLs

- **Backend API:** http://localhost:5000
- **Admin Panel:** http://localhost:5173
- **Main Website:** http://localhost:3000

---

## 🔐 Login Credentials

**Admin Panel:**
```
Email: admin@thecrosswild.com
Password: admin123
```

---

## 🧪 Test Backend

### Health Check:
```bash
curl http://localhost:5000/api/health
```

### Get Products:
```bash
curl http://localhost:5000/api/products
```

### Get Blogs:
```bash
curl http://localhost:5000/api/blogs
```

---

## 🛑 Stop Services

Press `Ctrl + C` in each terminal window.

---

## 🔄 Restart Services

Just run the start commands again in each terminal.

---

## 📊 Check Logs

### Backend Logs:
Already visible in Terminal 1 (auto-updates with nodemon)

### Admin Panel Logs:
Already visible in Terminal 2 (Vite dev server)

### Website Logs:
Already visible in Terminal 3 (Next.js dev server)

---

## 🐛 Troubleshooting

### Port Already in Use:

**Backend (5000):**
```bash
lsof -ti:5000 | xargs kill -9
```

**Admin (5173):**
```bash
lsof -ti:5173 | xargs kill -9
```

**Website (3000):**
```bash
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error:

1. Check credentials in `backend/.env`
2. Verify IP whitelist in MongoDB Atlas
3. Test connection: `node utils/seedCategories.js`

### Missing Dependencies:

```bash
# Backend
cd backend && npm install

# Admin
cd admin && npm install

# Website
cd TheCrossWild && npm install
```

---

## 📝 Common Tasks

### Add New Product (via API):

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Custom T-Shirt",
    "description": "High quality printed t-shirt",
    "price": 599,
    "stock": 100,
    "category": "tshirts",
    "image": "https://i.ibb.co/your-image.jpg",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Red", "Blue", "Black"],
    "bestSeller": true,
    "newArrival": true
  }'
```

### View Database:

```bash
# Using MongoDB Compass
mongodb://uname:PASSWORD@thecrosswild.j8lzvdi.mongodb.net/
```

### Build for Production:

```bash
# Backend
cd backend && npm start

# Admin
cd admin && npm run build

# Website
cd TheCrossWild && npm run build
```

---

## ✅ Quick Health Check

Run this to check all services:

```bash
# Backend
curl -s http://localhost:5000/api/health

# Admin
curl -s http://localhost:5173

# Website
curl -s http://localhost:3000
```

If all return responses, everything is running! ✅

---

**Save this file for quick reference!**
