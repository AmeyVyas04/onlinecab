'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser, FaPhone, FaBars, FaTimes, FaCar, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check if user is logged in by verifying token
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Important for sending cookies if you're using them
        });
        
        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUserData(userData);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        setIsLoggedIn(false);
        setUserData(null);
        setIsMenuOpen(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <FaCar className="text-blue-900 text-xl" />
            </div>
            <span className="text-xl font-bold text-blue-900">QuickCab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">
              Home
            </Link>
            
            {/* Show Book Ride only if user is logged in */}
            {isLoggedIn && (
              <Link href="/navcompo/bookaride" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">
                Book Ride
              </Link>
            )}
            
            <Link href="/pricing" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              // Show user menu and logout if user is logged in
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {userData?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              // Show sign up button if user is not logged in
              <Link 
                href="/authfrontend/signup" 
                className="flex items-center space-x-1 text-gray-700 hover:text-yellow-500 transition-colors"
              >
                <FaUser className="text-lg" />
                <span>Sign Up</span>
              </Link>
            )}
            
            {/* Show Book Now button only if user is logged in */}
            {isLoggedIn && (
              <Link 
                href="/navcompo/bookaride" 
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center space-x-1"
              >
                <FaCar className="text-lg" />
                <span>Book Now</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Show Book Ride only if user is logged in */}
              {isLoggedIn && (
                <Link 
                  href="/navcompo/bookaride" 
                  className="text-gray-700 hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Ride
                </Link>
              )}
              
              <Link 
                href="/pricing" 
                className="text-gray-700 hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                {isLoggedIn ? (
                  // Show user info and logout button if user is logged in
                  <>
                    <div className="px-4 py-2 text-gray-700">
                      Hello, <span className="font-medium">{userData?.name || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-red-600 px-4 py-2 transition-colors w-full text-left"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  // Show login/signup buttons if user is not logged in
                  <>
                    <Link 
                      href="/authfrontend/login" 
                      className="flex items-center space-x-2 text-gray-700 px-4 py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser />
                      <span>Login</span>
                    </Link>
                    <Link 
                      href="/authfrontend/signup" 
                      className="flex items-center space-x-2 text-blue-600 px-4 py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
                
                {/* Show Book Now button only if user is logged in */}
                {isLoggedIn && (
                  <Link 
                    href="/navcompo/bookaride" 
                    className="flex items-center space-x-2 bg-yellow-400 text-blue-900 px-4 py-2 mx-4 rounded-lg font-medium mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaCar />
                    <span>Book Now</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}