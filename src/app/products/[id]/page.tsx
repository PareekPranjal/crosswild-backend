"use client";

import { useState, useEffect } from 'react';
import { use } from 'react';
import { productsAPI, type Product } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  MessageCircle,
  Mail,
  Phone,
  Check,
  Package,
  Sparkles,
  Share2,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { ProductSEO } from '@/components/SEO/SEOHead';

// Contact details for inquiries
const WHATSAPP_NUMBER = '+919529626262';
const EMAIL_ADDRESS = 'orders@thecrosswild.com';

// Category name formatter - uses product type name if available
const formatCategoryName = (category: string, productType?: Product['productType']) => {
  if (productType?.name) return productType.name;
  const names: Record<string, string> = {
    tshirts: 'T-Shirts',
    sweatshirts: 'Sweatshirts',
    caps: 'Caps',
    bags: 'Bags',
    mugs: 'Mugs',
    cards: 'Business Cards',
    printing: 'Printing',
    uniforms: 'Uniforms',
    gifts: 'Gifts',
  };
  return names[category] || category;
};

// Format detail value for display
const formatDetailValue = (value: any): string => {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({
    logoText: '',
    position: 'center',
  });
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsAPI.getById(id);
        setProduct(data);
        // Set default selections
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.minOrderQuantity) {
          setQuantity(data.minOrderQuantity);
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Generate WhatsApp link with product details
  const getWhatsAppLink = () => {
    if (!product) return '#';

    const details = [
      `Hi! I'm interested in the following product:`,
      ``,
      `*${product.name}*`,
      `Category: ${formatCategoryName(product.category, product.productType)}`,
      selectedColor && `Color: ${selectedColor}`,
      selectedSize && `Size: ${selectedSize}`,
      `Quantity: ${quantity}`,
      customization.logoText && `Customization: ${customization.logoText} (Position: ${customization.position})`,
      ``,
      `Link: ${typeof window !== 'undefined' ? window.location.href : ''}`,
      ``,
      `Please share the pricing and availability details.`
    ].filter(Boolean).join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(details)}`;
  };

  // Generate Email link with product details
  const getEmailLink = () => {
    if (!product) return '#';

    const subject = `Inquiry: ${product.name}`;
    const body = [
      `Hi,`,
      ``,
      `I'm interested in the following product:`,
      ``,
      `Product: ${product.name}`,
      `Category: ${formatCategoryName(product.category, product.productType)}`,
      selectedColor && `Color: ${selectedColor}`,
      selectedSize && `Size: ${selectedSize}`,
      `Quantity: ${quantity}`,
      customization.logoText && `Customization: ${customization.logoText} (Position: ${customization.position})`,
      ``,
      `Link: ${typeof window !== 'undefined' ? window.location.href : ''}`,
      ``,
      `Please share the pricing and availability details.`,
      ``,
      `Thank you!`
    ].filter(Boolean).join('\n');

    return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Share product
  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md px-4">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {error ? 'Error Loading Product' : 'Product Not Found'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {error || "The product you're looking for doesn't exist or may have been removed."}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Combine main image with sub images for gallery
  const images = [product.image, ...(product.subImages || [])].filter(Boolean);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* SEO */}
      <ProductSEO product={product} />

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="w-full px-6 lg:px-12 py-4 pt-24">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href={`/products?category=${product.category}`}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {formatCategoryName(product.category, product.productType)}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="relative aspect-square">
                {images[selectedImage] ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <Package className="w-24 h-24 text-gray-300" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Featured
                    </span>
                  )}
                  {product.newArrival && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      New Arrival
                    </span>
                  )}
                  {product.bestSeller && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                      isWishlisted
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 hover:bg-white text-gray-700'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden transition-all ${
                      selectedImage === idx
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <Link
                href={`/products?category=${product.category}`}
                className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors mb-3"
              >
                {formatCategoryName(product.category, product.productType)}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title || product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviews > 0 && (
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  )}
                </div>
              )}
            </div>

            {/* Price Inquiry Card */}
            <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Get Best Price Quote
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Contact us for pricing, bulk discounts, and customization options
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Color: <span className="text-gray-900 dark:text-white normal-case">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Size: <span className="text-gray-900 dark:text-white normal-case">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] h-12 px-4 rounded-xl font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Customization Options</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo/Text to Print
                  </label>
                  <input
                    type="text"
                    value={customization.logoText}
                    onChange={(e) => setCustomization({ ...customization, logoText: e.target.value })}
                    placeholder="Enter text or describe logo"
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Print Position
                  </label>
                  <select
                    value={customization.position}
                    onChange={(e) => setCustomization({ ...customization, position: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="center">Center</option>
                    <option value="left">Left Chest</option>
                    <option value="back">Back</option>
                    <option value="sleeve">Sleeve</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quantity
                {product.minOrderQuantity && product.minOrderQuantity > 1 && (
                  <span className="text-xs font-normal text-gray-400 ml-2 normal-case">
                    (Min. order: {product.minOrderQuantity})
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(product.minOrderQuantity || 1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span className="text-2xl font-light">-</span>
                  </button>
                  <span className="w-16 text-center font-bold text-xl text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span className="text-2xl font-light">+</span>
                  </button>
                </div>
                <span className="text-sm text-gray-500">Bulk orders get special discounts!</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Inquire on WhatsApp
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={getEmailLink()}
                  className="py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email Inquiry
                </a>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Fast Delivery</p>
                <p className="text-xs text-gray-500">Pan-India</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Quality Assured</p>
                <p className="text-xs text-gray-500">Premium Materials</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Easy Returns</p>
                <p className="text-xs text-gray-500">7-Day Policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications - Dynamic Details */}
        {product.details && Object.keys(product.details).length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {product.productType?.icon && <span className="mr-2">{product.productType.icon}</span>}
              {product.productType?.name || 'Product'} Specifications
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(product.details).map(([key, value]) => {
                if (value === undefined || value === null || value === '') return null;
                return (
                  <div key={key} className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {key}
                    </span>
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      {formatDetailValue(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Details Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Features */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Product Details</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  Features
                </h3>
                <ul className="space-y-3">
                  {[
                    'Premium quality fabric with superior finish',
                    'Custom logo printing with vibrant colors',
                    'Available in multiple sizes and colors',
                    'Bulk order discounts available',
                    'Fast turnaround time for orders',
                    'Eco-friendly printing methods',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  Ideal For
                </h3>
                <ul className="space-y-3">
                  {[
                    'Corporate events and team building',
                    'Promotional campaigns',
                    'Schools and educational institutions',
                    'Sports teams and clubs',
                    'Retail and merchandising',
                    'Personal gifting',
                  ].map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-white/80 mb-6">
              Our team is ready to assist you with your order. Get in touch for personalized quotes and support.
            </p>

            <div className="space-y-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-white/70">{WHATSAPP_NUMBER}</p>
                </div>
              </a>

              <a
                href={getEmailLink()}
                className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <Mail className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-white/70">{EMAIL_ADDRESS}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                <Clock className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Working Hours</p>
                  <p className="text-sm text-white/70">Mon - Sat, 9AM - 7PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Products
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
