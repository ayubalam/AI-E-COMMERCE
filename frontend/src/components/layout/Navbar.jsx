import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      
      <div className="w-full px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          AI Smart Commerce
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          
          <Link
            to="/"
            className="text-lg font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-lg font-medium hover:text-blue-600 transition"
          >
            Products
          </Link>

          <Link
            to="/login"
            className="text-lg font-medium hover:text-blue-600 transition"
          >
            Login
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-3xl text-slate-700"
          >
            <FaShoppingCart />

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-5 flex flex-col gap-5">
          
          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Link to="/login">Login</Link>

          <Link
            to="/cart"
            className="flex items-center gap-3"
          >
            <FaShoppingCart />
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;