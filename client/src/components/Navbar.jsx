import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-2 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left section: Version and Amusement (Visible on all screens, adjust if needed) */}
        <div className="flex items-center space-x-4 text-sm">
          <p className="font-semibold">VERSION 1.0.96</p>
          <p className="hidden md:block">FOR AMUSMENT ONLY</p> {/* Hide on small screens */}
          {/* Placeholder for lock icon - replace with actual icon if available */}
          <span className="ml-2 hidden md:block">🔒</span> {/* Hide on small screens */}
        </div>

        {/* Hamburger Icon (Visible only on small screens) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="p-2 focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu (Hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Center section: Welcome and Balance */}
          <div className="flex items-center space-x-6 text-lg font-bold">
            {user ? (
              <>
                <span>WELCOME, {user.name}</span>
                <span className="flex items-center"><span className="mr-1">💰</span>BALANCE : ₹{user.wallet}</span>
              </>
            ) : (
              // This case should ideally not be reached if Navbar is inside ProtectedRoute
              <Link
                to="/login"
                className="text-white hover:text-yellow-400"
              >
                Login
              </Link>
            )}
          </div>

          {/* Right section: Logout */}
          <div className="flex items-center">
            {user && (
              <button
                onClick={logout}
                className="p-1 rounded hover:bg-gray-700 transition-colors duration-200"
                title="Logout"
              >
                <img src="/assets/logout.png" alt="Logout" className="h-6 w-auto" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Shown only when isMobileMenuOpen is true and on small screens) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user ? (
            <>
              <div className="text-white block px-3 py-2 rounded-md text-base font-medium">WELCOME, {user.name}</div>
              <div className="text-white block px-3 py-2 rounded-md text-base font-medium">BALANCE : ₹{user.wallet}</div>
              <button
                onClick={() => { logout(); toggleMobileMenu(); }}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 