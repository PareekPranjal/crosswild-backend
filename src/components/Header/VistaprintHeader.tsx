"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone, Mail, Home, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from '@/components/Cart/CartDrawer';

const categories = [
  {
    name: 'Marketing Materials',
    items: [
      { name: 'Business Cards', link: '/products?category=cards' },
      { name: 'Flyers & Leaflets', link: '/products?category=printing' },
      { name: 'Brochures', link: '/products?category=printing' },
      { name: 'Posters', link: '/products?category=printing' },
    ]
  },
  {
    name: 'Clothing & Bags',
    items: [
      { name: 'T-Shirts', link: '/products?category=tshirts' },
      { name: 'Hoodies & Sweatshirts', link: '/products?category=sweatshirts' },
      { name: 'Caps & Hats', link: '/products?category=caps' },
      { name: 'Bags & Totes', link: '/products?category=bags' },
    ]
  },
  {
    name: 'Gifts & Accessories',
    items: [
      { name: 'Mugs & Drinkware', link: '/products?category=mugs' },
      { name: 'Custom Gifts', link: '/products?category=gifts' },
      { name: 'Promotional Items', link: '/products?category=gifts' },
    ]
  },
  {
    name: 'Uniforms',
    items: [
      { name: 'School Uniforms', link: '/products?category=uniforms' },
      { name: 'Staff Uniforms', link: '/products?category=uniforms' },
      { name: 'Sports Uniforms', link: '/products?category=uniforms' },
    ]
  },
];

export default function VistaprintHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  const isHomePage = pathname === '/';
  const isProductsPage = pathname === '/products' || pathname.startsWith('/products?');
  const isBlogPage = pathname === '/blog' || pathname.startsWith('/blog/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-800 text-white text-sm py-2 hidden lg:block">
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-gray-200">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@thecrosswild.com" className="flex items-center gap-2 hover:text-gray-200">
              <Mail className="w-4 h-4" />
              <span>info@thecrosswild.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/our_process" className="hover:text-gray-200">How It Works</Link>
            <Link href="/about" className="hover:text-gray-200">About Us</Link>
            <Link href="/contact" className="hover:text-gray-200">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo/logo-crosswile.jpg"
                alt="The CrossWild"
                width={160}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md hover:bg-primary/90">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isHomePage ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block border-t">
            <ul className="flex items-center gap-8 py-3">
              <li>
                <Link
                  href="/products"
                  className={`text-sm font-semibold ${
                    isProductsPage ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category, idx) => (
                <li
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(category.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium hover:text-primary py-2">
                    {category.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown */}
                  {activeDropdown === category.name && (
                    <div className="absolute top-full left-0 mt-0 bg-white border shadow-lg rounded-lg min-w-[200px] py-2">
                      {category.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.link}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className={`text-sm font-medium ${
                    isBlogPage ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-2">
                <Link
                  href="/products"
                  className={`block py-2 font-semibold ${
                    isProductsPage ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  All Products
                </Link>
                {categories.map((category, idx) => (
                  <div key={idx} className="border-t pt-2">
                    <div className="font-semibold mb-2">{category.name}</div>
                    {category.items.map((item, i) => (
                      <Link
                        key={i}
                        href={item.link}
                        className="block py-1.5 pl-4 text-sm text-gray-600 hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  href="/blog"
                  className={`block py-2 font-medium border-t pt-4 ${
                    isBlogPage ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  Blog
                </Link>
              </div>

              {/* Mobile Contact Buttons */}
              <div className="flex gap-2 border-t pt-4">
                <a
                  href="https://wa.me/919529626262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+919529626262"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              {/* Mobile Actions */}
              <div className="flex gap-2 pt-2">
                <Link
                  href="/"
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg ${
                    isHomePage ? 'bg-primary text-white' : 'border hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
