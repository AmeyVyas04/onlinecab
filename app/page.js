'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from './navbar';
import Footer from './footer';

export default function HomePage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-900/70"></div>
          <Image
            src="/tokyonight.jpg"
            alt="City skyline"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Ride, <span className="text-yellow-400">On Demand</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Book a cab in minutes and travel comfortably to your destination. 
            Safe, reliable, and always on time.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/book" 
              className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors text-lg shadow-lg"
            >
              Book Your Ride
            </Link>
            <Link 
              href="/services" 
              className="bg-white/20 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition-colors text-lg border border-white/30"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Verified Drivers' },
              { number: '24/7', label: 'Available' },
              { number: '50+', label: 'Cities' }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-yellow-400">QuickCab</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the best cab service with focus on safety, comfort, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⏱️',
                title: 'Quick Booking',
                description: 'Book a cab in less than 30 seconds with our intuitive app'
              },
              {
                icon: '🛡️',
                title: 'Safe Rides',
                description: 'All our drivers are verified and trained for your safety'
              },
              {
                icon: '💲',
                title: 'Affordable Pricing',
                description: 'Transparent pricing with no hidden charges'
              },
              {
                icon: '🚗',
                title: 'Wide Range of Vehicles',
                description: 'From economy to luxury, choose what suits you best'
              },
              {
                icon: '📱',
                title: 'Live Tracking',
                description: 'Track your ride in real-time and share status with others'
              },
              {
                icon: '⭐',
                title: '24/7 Service',
                description: 'Available round the clock for all your travel needs'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a variety of services to meet all your transportation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'City Rides',
                description: 'Navigate through city traffic with our experienced drivers. Perfect for daily commutes, shopping, or meetings.',
                image: '/city-rides.jpg',
                features: ['Point-to-point travel', 'Multiple payment options', 'Instant booking']
              },
              {
                title: 'Airport Transfers',
                description: 'On-time airport pickups and drops with flight monitoring. Never miss a flight again.',
                image: '/airport-transfer.jpg',
                features: ['Flight tracking', 'Meet & greet service', 'Fixed pricing']
              },
              {
                title: 'Outstation Trips',
                description: 'Comfortable long-distance travel with verified drivers. Explore new destinations worry-free.',
                image: '/outstation.jpg',
                features: ['One-way & round trips', 'Multiple stop options', 'Experienced drivers']
              },
              {
                title: 'Luxury Rides',
                description: 'Travel in style with our premium luxury vehicles. Perfect for special occasions and business travel.',
                image: '/luxury-rides.jpg',
                features: ['Premium vehicles', 'Professional chauffeurs', 'Complimentary amenities']
              }
            ].map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">
                  {service.title === 'City Rides' && '🚗'}
                  {service.title === 'Airport Transfers' && '✈️'}
                  {service.title === 'Outstation Trips' && '🏞️'}
                  {service.title === 'Luxury Rides' && '⭐'}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  <ul className="text-gray-500">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-1">
                        <span className="text-yellow-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/services" 
                    className="inline-block mt-4 text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-block bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl font-bold mb-6">
                Download Our <span className="text-yellow-400">Mobile App</span>
              </h2>
              <p className="text-xl mb-8 text-gray-100">
                Book rides faster, get exclusive offers, and track your ride in real-time with our easy-to-use app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
                  <span className="text-2xl">📱</span>
                  <span>App Store</span>
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
                  <span className="text-2xl">🤖</span>
                  <span>Google Play</span>
                </button>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              {/* Placeholder for app screenshot */}
              <div className="relative w-64 h-96 bg-gray-800 rounded-3xl border-8 border-gray-900 shadow-2xl">
                <div className="absolute inset-4 bg-gray-700 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🚗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied customers about their experience with QuickCab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Business Traveler',
                comment: 'QuickCab has made my business trips so much easier. The drivers are always professional and punctual.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Daily Commuter',
                comment: 'I use QuickCab every day for my office commute. Affordable and reliable service!',
                rating: 4
              },
              {
                name: 'Emma Rodriguez',
                role: 'Family Traveler',
                comment: 'Traveling with kids can be stressful, but QuickCab makes it comfortable and safe. Highly recommended!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}