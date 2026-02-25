"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone, Mail, Home, MessageCircle, Loader2, Tag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectTotalItems } from '@/store/slices/cartSlice';
import {
  selectIsMenuOpen, selectIsMobileSearchOpen,
  openCart, toggleMenu, closeMenu, toggleMobileSearch, closeMobileSearch,
} from '@/store/slices/uiSlice';
import { productsAPI, Product } from '@/lib/api';
import CartDrawer from '@/components/Cart/CartDrawer';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

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

const FLAT_CATEGORIES = [
  { name: 'T-Shirts', slug: 'tshirts' },
  { name: 'Hoodies & Sweatshirts', slug: 'sweatshirts' },
  { name: 'Caps & Hats', slug: 'caps' },
  { name: 'Bags & Totes', slug: 'bags' },
  { name: 'Mugs & Drinkware', slug: 'mugs' },
  { name: 'Custom Gifts', slug: 'gifts' },
  { name: 'Business Cards', slug: 'cards' },
  { name: 'Printing', slug: 'printing' },
  { name: 'Uniforms', slug: 'uniforms' },
];

function SearchBox({
  value, onChange, onSubmit, suggestions, loading, showDropdown,
  onSelectProduct, onSelectCategory, onClose, containerRef, inputClass, isMobile,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  suggestions: Product[];
  loading: boolean;
  showDropdown: boolean;
  onSelectProduct: (id: string) => void;
  onSelectCategory: (slug: string) => void;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputClass: string;
  isMobile: boolean;
}) {
  const matchingCategories = FLAT_CATEGORIES.filter(c =>
    value.trim().length > 0 && c.name.toLowerCase().includes(value.toLowerCase())
  );
  const hasResults = matchingCategories.length > 0 || suggestions.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          onFocus={() => value.trim() && onClose()}
          className={inputClass}
          autoComplete="off"
        />
        <button
          onClick={onSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>

      {showDropdown && value.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-theme-bg dark:bg-[#1E1A14] border border-theme-border rounded-xl shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[200] overflow-hidden max-h-[420px] overflow-y-auto">
          {loading && suggestions.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-6 text-theme-text-muted text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Searching...
            </div>
          )}
          {!loading && !hasResults && (
            <div className="py-6 text-center text-theme-text-muted text-sm">
              No results found for &quot;{value}&quot;
            </div>
          )}
          {matchingCategories.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-theme-text-muted uppercase tracking-wider border-b border-theme-border">
                Categories
              </div>
              {matchingCategories.map(cat => (
                <button key={cat.slug} onClick={() => onSelectCategory(cat.slug)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theme-bg-soft dark:hover:bg-[#26211A] transition-colors text-left">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <Tag className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-theme-text">{cat.name}</div>
                    <div className="text-xs text-theme-text-muted">Browse category</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-theme-text-muted uppercase tracking-wider border-b border-theme-border">
                Products
              </div>
              {suggestions.map(product => (
                <button key={product.id} onClick={() => onSelectProduct(product.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theme-bg-soft dark:hover:bg-[#26211A] transition-colors text-left">
                  {product.image ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-theme-bg-soft">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-theme-bg-soft flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-theme-text truncate">{product.title || product.name}</div>
                    {product.category && (
                      <div className="text-xs text-theme-text-muted capitalize">{product.category}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          {value.trim().length > 0 && (
            <button onClick={onSubmit}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-theme-bg-soft dark:bg-[#26211A] hover:bg-theme-bg-card dark:hover:bg-[#2E2820] transition-colors text-sm font-semibold text-primary border-t border-theme-border">
              <Search className="w-4 h-4" />
              See all results for &quot;{value}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function VistaprintHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux UI state
  const isMenuOpen = useAppSelector(selectIsMenuOpen);
  const isMobileSearchOpen = useAppSelector(selectIsMobileSearchOpen);
  const totalItems = useAppSelector(selectTotalItems);

  // Local state (ephemeral, no need in Redux)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileBarSearchRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === '/';
  const isProductsPage = pathname === '/products' || pathname.startsWith('/products?');
  const isBlogPage = pathname === '/blog' || pathname.startsWith('/blog/');

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setShowDropdown(true);
    setSearchLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await productsAPI.getAll({ search: searchQuery.trim(), limit: 6 });
        setSuggestions(res.products || []);
      } catch {
        setSuggestions([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!desktopSearchRef.current?.contains(target) && !mobileBarSearchRef.current?.contains(target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (!searchQuery.trim()) return;
    setShowDropdown(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  }, [searchQuery, router]);

  const handleSelectProduct = useCallback((id: string) => {
    setShowDropdown(false);
    setSearchQuery('');
    dispatch(closeMobileSearch());
    router.push(`/products/${id}`);
  }, [dispatch, router]);

  const handleSelectCategory = useCallback((slug: string) => {
    setShowDropdown(false);
    setSearchQuery('');
    dispatch(closeMobileSearch());
    router.push(`/products?category=${slug}`);
  }, [dispatch, router]);

  const closeDropdown = useCallback(() => setShowDropdown(false), []);

  return (
    <>
      {/* Backdrop — blurs page when search dropdown or burger menu is open */}
      <div
        onClick={() => { closeDropdown(); dispatch(closeMenu()); }}
        className={`fixed inset-0 z-40 backdrop-blur-sm bg-black/30 transition-opacity duration-200 ${
          (showDropdown || isMenuOpen) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Top Bar */}
      <div className="bg-primary-800 dark:bg-[#1E1A14] text-white dark:text-[#C8B99A] text-sm py-2 hidden lg:block">
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">
              <Phone className="w-4 h-4" /><span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@thecrosswild.com" className="flex items-center gap-2 hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">
              <Mail className="w-4 h-4" /><span>info@thecrosswild.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/our_process" className="hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">How It Works</Link>
            <Link href="/about" className="hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-theme-bg border-b border-theme-border transition-shadow duration-300 ${
        isScrolled ? 'shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)]' : 'shadow-sm'
      }`}>
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image src="/images/logo/logo-crosswile.jpg" alt="The CrossWild"
                width={160} height={50} className="h-12 w-auto dark:brightness-90" priority />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <SearchBox
                value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearchSubmit}
                suggestions={suggestions} loading={searchLoading} showDropdown={showDropdown}
                onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory}
                onClose={closeDropdown} containerRef={desktopSearchRef}
                inputClass="w-full px-4 py-3 pr-12 border-2 border-theme-border bg-theme-bg-soft dark:bg-[#1E1A14] text-theme-text placeholder-theme-text-muted rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                isMobile={false}
              />
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isHomePage ? 'bg-primary text-white' : 'text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A]'
              }`}>
                <Home className="w-5 h-5" /><span className="font-medium">Home</span>
              </Link>

              <button onClick={() => dispatch(openCart())}
                className="relative flex items-center gap-2 px-4 py-2 text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A] rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <ThemeToggle />
            </div>

            {/* Mobile: Search + Theme + Menu */}
            <div className="lg:hidden flex items-center gap-1">
              <button onClick={() => dispatch(toggleMobileSearch())}
                className="p-2 text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A] rounded-lg transition-colors">
                {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <ThemeToggle />
              <button onClick={() => dispatch(toggleMenu())}
                className="p-2 text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A] rounded-lg transition-colors">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileSearchOpen ? 'max-h-[400px] pb-3 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <SearchBox
              value={searchQuery} onChange={setSearchQuery}
              onSubmit={() => { handleSearchSubmit(); dispatch(closeMobileSearch()); }}
              suggestions={suggestions} loading={searchLoading} showDropdown={showDropdown}
              onSelectProduct={(id) => { handleSelectProduct(id); dispatch(closeMobileSearch()); }}
              onSelectCategory={(slug) => { handleSelectCategory(slug); dispatch(closeMobileSearch()); }}
              onClose={closeDropdown} containerRef={mobileBarSearchRef}
              inputClass="w-full px-4 py-2.5 border border-theme-border bg-theme-bg-soft dark:bg-[#1E1A14] text-theme-text placeholder-theme-text-muted rounded-lg pr-12 focus:outline-none focus:border-primary transition-colors text-sm"
              isMobile={true}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block border-t border-theme-border">
            <ul className="flex items-center gap-8 py-3">
              <li>
                <Link href="/products" className={`text-sm font-semibold transition-colors ${
                  isProductsPage ? 'text-primary' : 'text-theme-text-secondary hover:text-primary'
                }`}>All Products</Link>
              </li>
              {categories.map((category, idx) => (
                <li key={idx} className="relative"
                  onMouseEnter={() => setActiveDropdown(category.name)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  <button className="flex items-center gap-1 text-sm font-medium text-theme-text-secondary hover:text-primary transition-colors py-2">
                    {category.name}<ChevronDown className="w-4 h-4" />
                  </button>
                  {activeDropdown === category.name && (
                    <div className="absolute top-full left-0 mt-0 bg-theme-bg dark:bg-[#1E1A14] border border-theme-border shadow-lg dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-lg min-w-[200px] py-2">
                      {category.items.map((item, i) => (
                        <Link key={i} href={item.link}
                          className="block px-4 py-2 text-sm text-theme-text-secondary hover:text-primary hover:bg-theme-bg-soft dark:hover:bg-[#26211A] transition-colors">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li>
                <Link href="/blog" className={`text-sm font-medium transition-colors ${
                  isBlogPage ? 'text-primary' : 'text-theme-text-secondary hover:text-primary'
                }`}>Blog</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-theme-bg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[900px] border-t border-theme-border opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}>
          <div className="px-4 py-4 space-y-4 overflow-y-auto max-h-[75vh]">
            <div className="space-y-2">
              <Link href="/products" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-semibold transition-colors ${
                  isProductsPage ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>All Products</Link>
              {categories.map((category, idx) => (
                <div key={idx} className="border-t border-theme-border pt-2">
                  <div className="font-semibold mb-2 text-theme-text">{category.name}</div>
                  {category.items.map((item, i) => (
                    <Link key={i} href={item.link} onClick={() => dispatch(closeMenu())}
                      className="block py-1.5 pl-4 text-sm text-theme-text-secondary hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
              <Link href="/blog" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-medium border-t border-theme-border pt-4 transition-colors ${
                  isBlogPage ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>Blog</Link>
            </div>

            <div className="flex gap-2 border-t border-theme-border pt-4">
              <a href="https://wa.me/919529626262" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" />WhatsApp
              </a>
              <a href="tel:+919529626262"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                <Phone className="w-5 h-5" />Call Now
              </a>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href="/" onClick={() => dispatch(closeMenu())}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                  isHomePage ? 'bg-primary text-white' : 'border border-theme-border text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A]'
                }`}>
                <Home className="w-5 h-5" />Home
              </Link>
              <button onClick={() => { dispatch(openCart()); dispatch(closeMenu()); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors relative">
                <ShoppingCart className="w-5 h-5" />Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Scrolling Promo Ticker */}
          <div className="border-t border-primary/30 bg-primary overflow-hidden py-2.5">
            <div className="flex animate-scroll pause-animation whitespace-nowrap" style={{ animationDuration: '12s' }}>
              {[0, 1].map((i) => (
                <span key={i} className="flex items-center gap-6 text-white text-xs font-semibold px-6">
                  <span className="flex items-center gap-2">🎉 <span>Get 20% OFF on Bulk Orders!</span> <span className="bg-white/20 px-2 py-0.5 rounded font-bold">BULK20</span></span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-2">🚚 Free Delivery on Orders Above ₹999</span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-2">👕 Custom T-Shirts Starting ₹199</span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-2">🏆 Premium Quality Printing &amp; Merchandise</span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-2">📦 Pan India Fast Delivery</span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-2">✨ Uniforms, Gifts &amp; Promotional Items</span>
                  <span className="opacity-40">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
