import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Roulette Casino
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-accent">Wallet: ₹{user.wallet}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-accent"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-accent hover:bg-green-600 px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 