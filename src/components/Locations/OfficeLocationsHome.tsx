"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, ArrowRight, Building2 } from 'lucide-react';

export default function OfficeLocationsHome() {
  const offices = [
    {
      city: 'Jaipur',
      state: 'Rajasthan',
      iconColor: 'bg-amber-500',
      textColor: 'text-amber-500',
      borderColor: 'border-amber-500',
      phone: '+91 9876543210',
    },
    {
      city: 'Indore',
      state: 'Madhya Pradesh',
      iconColor: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      borderColor: 'border-emerald-500',
      phone: '+91 9123456789',
    },
    {
      city: 'Jodhpur',
      state: 'Rajasthan',
      iconColor: 'bg-blue-500',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500',
      phone: '+91 9988776655',
    },
    {
      city: 'Udaipur',
      state: 'Rajasthan',
      iconColor: 'bg-purple-500',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500',
      phone: '+91 9876501234',
    },
    {
      city: 'Ajmer',
      state: 'Rajasthan',
      iconColor: 'bg-rose-500',
      textColor: 'text-rose-500',
      borderColor: 'border-rose-500',
      phone: '+91 9876543220',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-purple-100 text-gray-800 px-4 py-2 rounded-full font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            Serving Across India
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            We're Closer Than You Think
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Visit us at any of our conveniently located offices across multiple cities
          </p>
        </div>

        {/* Offices Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          {offices.map((office, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden"
            >
              {/* Top Color Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${office.iconColor}`}></div>

              {/* Icon */}
              <div className={`${office.iconColor} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>

              {/* City Name */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {office.city}
              </h3>

              {/* State */}
              <p className={`text-sm font-medium ${office.textColor} mb-4`}>
                {office.state}
              </p>

              {/* Phone */}
              <a
                href={`tel:${office.phone}`}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-4"
              >
                <Phone className="w-4 h-4" />
                <span className="truncate">{office.phone}</span>
              </a>

              {/* Hover Effect */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${office.iconColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-10 text-white text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              📍 Multiple Locations, One Quality Standard
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              With offices in Jaipur, Indore, Jodhpur, Udaipur, and Ajmer, we're always nearby to serve you better.
              Same premium quality, faster delivery, personalized service at every location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                <span>View All Locations</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call Us Now</span>
              </a>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
