'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10 text-center">
        {/* Animated Lost Car */}
        <div className="relative h-48 mb-8">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-20 h-10 bg-yellow-400 rounded-md relative">
              <div className="w-4 h-4 bg-blue-900 rounded-sm absolute left-2 top-1"></div>
              <div className="w-4 h-4 bg-blue-900 rounded-sm absolute right-2 top-1"></div>
              <div className="w-4 h-4 bg-gray-800 rounded-full absolute -bottom-2 left-3"></div>
              <div className="w-4 h-4 bg-gray-800 rounded-full absolute -bottom-2 right-3"></div>
            </div>
          </div>
          
          {/* Map elements */}
          <div className="absolute top-4 left-10 text-4xl">🗺️</div>
          <div className="absolute bottom-10 right-12 text-3xl">🔍</div>
          
          {/* Question mark */}
          <div className="absolute top-12 right-12 text-5xl animate-bounce">❓</div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-white/80 mb-2">Oops! It looks like you took a wrong turn.</p>
        <p className="text-white/70 mb-8">Lets get you back on the road to your destination.</p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors shadow-md"
          >
            Go Home
          </Link>
          <Link 
            href="/book"
            className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/10"
          >
            Book a Ride
          </Link>
        </div>

        {/* Support contact */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/70 mb-2">Need help?</p>
          <p className="text-yellow-400 font-medium">support@quickcab.com</p>
        </div>
      </div>
    </div>
  );
}