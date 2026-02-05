"use client";

import React from 'react';
import { Truck, Shield, Headphones, Award, Clock, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick turnaround time with pan-India shipping',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Shield,
    title: '100% Quality Guarantee',
    description: 'Premium materials and strict quality checks',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help with your orders',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Competitive pricing with bulk discounts',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description: 'Get your products in 3-5 business days',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: ThumbsUp,
    title: 'Easy Ordering',
    description: 'Simple design tools and hassle-free process',
    color: 'bg-teal-100 text-teal-600',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose The CrossWild?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering excellence in every order
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">5000+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">50K+</div>
              <div className="text-white/80">Orders Delivered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">99%</div>
              <div className="text-white/80">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">24hrs</div>
              <div className="text-white/80">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
