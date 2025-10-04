'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10 text-center">
        {/* Animated Broken Car */}
        <div className="relative h-48 mb-8">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-20 h-10 bg-yellow-400 rounded-md relative">
              <div className="w-4 h-4 bg-blue-900 rounded-sm absolute left-2 top-1"></div>
              <div className="w-4 h-4 bg-blue-900 rounded-sm absolute right-2 top-1"></div>
              <div className="w-4 h-4 bg-gray-800 rounded-full absolute -bottom-2 left-3"></div>
              <div className="w-4 h-4 bg-gray-800 rounded-full absolute -bottom-2 right-3"></div>
            </div>
          </div>
          
          {/* Warning symbol */}
          <div className="absolute top-6 right-10 text-4xl animate-pulse">⚠️</div>
          
          {/* Tools */}
          <div className="absolute bottom-12 left-10 text-3xl">🔧</div>
          <div className="absolute bottom-8 right-8 text-2xl">🛠️</div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
        <p className="text-lg text-white/80 mb-6">
          We are experiencing technical difficulties. Our team is already working to fix the issue.
        </p>

        {/* Error message (optional) */}
        {error && (
          <details className="mb-6 text-left bg-red-900/30 p-3 rounded-lg">
            <summary className="cursor-pointer text-white/80 font-medium">Error Details</summary>
            <pre className="mt-2 text-sm text-white/70 overflow-auto p-2">
              {error.message}
            </pre>
          </details>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={reset}
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors shadow-md"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/10 text-center"
          >
            Go Home
          </Link>
        </div>

        {/* Support contact */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-white/70 mb-2">Need immediate assistance?</p>
          <p className="text-yellow-400 font-medium">support@quickcab.com</p>
          <p className="text-white/70 mt-1">1-800-QUICK-CAB</p>
        </div>
      </div>
    </div>
  );
}