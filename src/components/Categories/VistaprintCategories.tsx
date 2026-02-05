"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Business Cards',
    description: 'Make a lasting first impression',
    image: '📇',
    link: '/products?category=cards',
    color: 'from-blue-400 to-blue-600',
    popular: true,
  },
  {
    title: 'Custom T-Shirts',
    description: 'Design your own apparel',
    image: '👕',
    link: '/products?category=tshirts',
    color: 'from-purple-400 to-purple-600',
    popular: true,
  },
  {
    title: 'Promotional Mugs',
    description: 'Brand your drinkware',
    image: '☕',
    link: '/products?category=mugs',
    color: 'from-orange-400 to-orange-600',
  },
  {
    title: 'Custom Bags',
    description: 'Eco-friendly & stylish',
    image: '🛍️',
    link: '/products?category=bags',
    color: 'from-green-400 to-green-600',
  },
  {
    title: 'Caps & Hats',
    description: 'Headwear for every occasion',
    image: '🧢',
    link: '/products?category=caps',
    color: 'from-red-400 to-red-600',
  },
  {
    title: 'Flyers & Posters',
    description: 'Promote with impact',
    image: '📄',
    link: '/products?category=printing',
    color: 'from-pink-400 to-pink-600',
  },
  {
    title: 'Hoodies & Sweatshirts',
    description: 'Stay warm in style',
    image: '🧥',
    link: '/products?category=sweatshirts',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    title: 'Uniforms',
    description: 'Professional workwear',
    image: '👔',
    link: '/products?category=uniforms',
    color: 'from-teal-400 to-teal-600',
  },
];

export default function VistaprintCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What would you like to create?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of customizable products to bring your brand to life
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              href={category.link}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/50 overflow-hidden"
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              )}

              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.image}
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary text-sm font-semibold">
                  <span className="group-hover:mr-2 transition-all">Shop Now</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-primary hover:text-primary hover:shadow-lg transition-all"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
