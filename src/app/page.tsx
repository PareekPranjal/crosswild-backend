import VistaprintHero from "@/components/Hero/VistaprintHero";
import VistaprintCategories from "@/components/Categories/VistaprintCategories";
import ExploreAllCategories from "@/components/Categories/ExploreAllCategories";
import PopularProducts from "@/components/Products/PopularProducts";
import TrendingProducts from "@/components/Products/TrendingProducts";
import ShopByCategory from "@/components/Products/ShopByCategory";
import DealsSection from "@/components/Promotions/DealsSection";
import TrustSection from "@/components/Features/TrustSection";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process/Process";
import BestSellersAndNewArrivals from "@/components/CategorySection/BestSellersAndNewArrivals";
import OfficeLocationsHome from "@/components/Locations/OfficeLocationsHome";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "The CrossWild - Custom T-Shirts, Uniforms & Corporate Merchandise | Premium Printing Services",
  description: "Leading manufacturer of custom t-shirts, corporate uniforms, promotional merchandise, and personalized products. Premium printing, bulk orders, and custom branding solutions for businesses across India.",
  keywords: [
    "custom t-shirts India",
    "corporate uniforms manufacturer",
    "promotional merchandise",
    "bulk t-shirt printing",
    "custom merchandise",
    "corporate gifting",
    "branded apparel",
    "school uniforms",
    "staff uniforms",
    "promotional products",
  ],
  authors: [{ name: "The CrossWild" }],
  creator: "The CrossWild",
  publisher: "The CrossWild",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thecrosswild.com/",
    title: "The CrossWild - Custom T-Shirts & Corporate Merchandise",
    description: "Premium custom printing services for t-shirts, uniforms, and promotional merchandise. Trusted by leading brands across India.",
    siteName: "The CrossWild",
    images: [
      {
        url: "/images/logo/logo-crosswile.jpg",
        width: 1200,
        height: 630,
        alt: "The CrossWild - Custom Printing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The CrossWild - Custom T-Shirts & Corporate Merchandise",
    description: "Premium custom printing services for t-shirts, uniforms, and promotional merchandise.",
    images: ["/images/logo/logo-crosswile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />

      {/* Hero Section with Promotional Banner */}
      <VistaprintHero />

      {/* Product Categories - Vistaprint Style */}
      <VistaprintCategories />

      {/* Explore All Categories Section */}
      <ExploreAllCategories />

      {/* Best Sellers & New Arrivals */}
      <BestSellersAndNewArrivals />

      {/* Our Most Popular Products */}
      <PopularProducts />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Shop by Category - Products per Category */}
      <ShopByCategory />

      {/* Deals & Promotions Section */}
      <DealsSection />

      {/* Trust & Features Section */}
      <TrustSection />

      {/* Manufacturing Process */}
      <Process />

      {/* Multi-Location Offices */}
      <OfficeLocationsHome />

      {/* Trusted Brands & Clients */}
      <Brands />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </>
  );
}