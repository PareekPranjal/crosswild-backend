"use client";

import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  // Duplicate the brands array for seamless infinite scroll
  const duplicatedBrands = [...brandsData, ...brandsData];

  return (
    <section className="py-12 bg-theme-bg-soft overflow-hidden">
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Trusted by Leading Brands
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of satisfied clients who trust us for their printing needs
          </p>
        </div>

        {/* Scrolling Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-theme-bg-soft to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-theme-bg-soft to-transparent z-10 pointer-events-none"></div>

          {/* Infinite Scroll Wrapper */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll hover:pause-animation">
              {duplicatedBrands.map((brand, index) => (
                <SingleBrand key={`${brand.id}-${index}`} brand={brand} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">5000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Orders Delivered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">99%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="flex-shrink-0 mx-8 transition-transform hover:scale-110">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative block h-16 w-32 opacity-60 transition hover:opacity-100 dark:opacity-50 dark:hover:opacity-100"
      >
        {/* Light and dark mode logo */}
        <Image
          src={imageLight}
          alt={name}
          fill
          className="hidden dark:block object-contain"
        />
        <Image
          src={image}
          alt={name}
          fill
          className="block dark:hidden object-contain"
        />
      </a>
    </div>
  );
};
