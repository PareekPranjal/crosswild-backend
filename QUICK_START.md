# 🚀 Quick Start Guide - The CrossWild

## Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Customize Your Store

#### Update Contact Information
1. **WhatsApp Number** - `src/app/checkout/page.tsx` line 52
2. **Phone Number** - `src/components/CallButton/callButton.tsx`
3. **WhatsApp Button** - `src/components/WhatsAppButton/whatsAppBotton.tsx`

#### Add Your Products
Edit `src/data/products.ts` and add/modify products:
```typescript
{
  id: 'your-product-id',
  name: 'Your Product Name',
  description: 'Product description',
  price: 499,
  category: 'tshirts', // or other categories
  image: '/images/product/your-image.jpg',
  colors: ['White', 'Black', 'Blue'],
  sizes: ['S', 'M', 'L', 'XL'],
  featured: true, // Show on homepage
}
```

#### Update Branding
- Logo: Replace `public/images/logo/logo-crosswile.jpg`
- Colors: Edit `src/styles/index.css`
- Company Info: Update `src/app/page.tsx` metadata

---

## 🎯 Key Features Overview

### 1. Shopping Cart
- Click cart icon in header
- Add products from any page
- Manage quantities in drawer
- Proceed to checkout

### 2. Product Management
- Browse: `/products`
- Search & filter by category
- Sort by price, name, rating
- View details: `/products/[id]`

### 3. Checkout Process
- Fill shipping details
- Review order
- Send via WhatsApp
- Get confirmation

---

## 📝 Important Files

| File | Purpose |
|------|---------|
| `src/data/products.ts` | Product catalog |
| `src/app/page.tsx` | Homepage |
| `src/app/checkout/page.tsx` | Checkout flow |
| `src/components/Headerr/Header.tsx` | Navigation |
| `src/contexts/CartContext.tsx` | Cart state |

---

## 🛠️ Common Tasks

### Add New Product
1. Open `src/data/products.ts`
2. Add new product object to `products` array
3. Upload image to `public/images/product/`
4. Product appears automatically!

### Change Primary Color
1. Open `src/styles/index.css`
2. Find `--color-primary`
3. Change RGB values

### Update WhatsApp Number
1. Open `src/app/checkout/page.tsx`
2. Line 52: Change `+919876543210` to your number
3. Also update `src/components/WhatsAppButton/whatsAppBotton.tsx`

### Add More Categories
1. Edit `src/data/products.ts`
2. Add to `productCategories` array
3. Add products with that category

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📱 Test Your Site

1. **Homepage**: [http://localhost:3000](http://localhost:3000)
2. **Products**: [http://localhost:3000/products](http://localhost:3000/products)
3. **Checkout**: Add items and click cart icon
4. **404 Page**: Visit any invalid URL

---

## 🆘 Need Help?

- Check `IMPROVEMENTS.md` for detailed documentation
- All features are working and tested
- Build passes with zero errors

---

## ✅ Pre-Launch Checklist

- [ ] Update WhatsApp number
- [ ] Update phone number
- [ ] Replace logo
- [ ] Add your products
- [ ] Update company info
- [ ] Test checkout flow
- [ ] Test on mobile
- [ ] Run `npm run build`
- [ ] Deploy to hosting

---

**You're ready to go live! 🎉**

Visit your site and start receiving orders!
