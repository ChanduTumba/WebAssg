import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo/Title */}
        <Link to="/home" className="text-3xl font-bold hover:text-gray-400 transition duration-300">
          Book Store
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/home" className="hover:text-gray-400 transition duration-300">
            Home
          </Link>
          <Link to="/cart" className="hover:text-gray-400 transition duration-300">
            Cart
          </Link>
          <Link to="/purchased-books" className="hover:text-gray-400 transition duration-300">
            Purchased Books
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-400 transition duration-300 focus:outline-none"
          >
            Logout
          </button>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
