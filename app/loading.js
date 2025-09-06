'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 drop-shadow-md">QuickCab</h1>
          <p className="text-white/80 mt-2">Your ride is on the way</p>
        </div>

        {/* Animated Road */}
        <div className="relative h-32 mb-8 overflow-hidden">
          {/* Road */}
          <div className="absolute bottom-0 w-full h-12 bg-gray-700 rounded-lg"></div>
          
          {/* Road markings */}
          <div className="absolute bottom-5 w-full h-1 bg-yellow-400"></div>
          <div className="absolute bottom-5 w-4 h-1 bg-yellow-400 left-1/4"></div>
          <div className="absolute bottom-5 w-4 h-1 bg-yellow-400 left-2/4"></div>
          <div className="absolute bottom-5 w-4 h-1 bg-yellow-400 left-3/4"></div>
          
          {/* Moving Cab */}
          <div 
            className="absolute bottom-7 w-14 h-6 bg-yellow-400 rounded-md flex items-center justify-center transition-all duration-1000 ease-linear"
            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          >
            {/* Cab windows */}
            <div className="w-2 h-3 bg-blue-900 rounded-sm absolute left-1"></div>
            <div className="w-2 h-3 bg-blue-900 rounded-sm absolute right-1"></div>
            {/* Cab wheels */}
            <div className="w-3 h-3 rounded-full bg-gray-800 absolute -bottom-2 left-2"></div>
            <div className="w-3 h-3 rounded-full bg-gray-800 absolute -bottom-2 right-2"></div>
          </div>

          {/* Destination pin */}
          <div className="absolute bottom-9 right-4 text-2xl">📍</div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div 
            className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress text */}
        <div className="text-center text-white">
          <p className="text-lg font-medium mb-2">Finding the best driver for you</p>
          <p className="text-sm text-white/70">{progress}% complete</p>
        </div>

        {/* Pulsing animation */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}