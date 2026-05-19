import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import useCart from "../../hooks/useCart";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useCart();

  const { user, logout } = useAuth();

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
          
          {/* Home */}
          <Link
            to="/"
            className="text-lg font-medium hover:text-blue-600 transition duration-300"
          >
            Home
          </Link>

          {/* Products */}
          <Link
            to="/products"
            className="text-lg font-medium hover:text-blue-600 transition duration-300"
          >
            Products
          </Link>

          {/* Dashboard */}
          {user && (
            <Link
              to="/dashboard"
              className="text-lg font-medium hover:text-blue-600 transition duration-300"
            >
              Dashboard
            </Link>
          )}

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={logout}
              className="text-lg font-medium hover:text-red-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium hover:text-blue-600 transition duration-300"
            >
              Login
            </Link>
          )}

          {/* User Icon */}
          {user && (
            <div className="flex items-center gap-2 text-slate-700">
              
              <FaUserCircle className="text-2xl" />

              <span className="font-medium">
                {user.email}
              </span>
            </div>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-3xl text-slate-700 hover:text-blue-600 transition duration-300"
          >
            <FaShoppingCart />

            {/* Cart Count */}
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-slate-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-5 flex flex-col gap-5">
          
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium"
          >
            Products
          </Link>

          {/* Dashboard */}
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium"
            >
              Dashboard
            </Link>
          )}

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="text-left text-lg font-medium text-red-500"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium"
            >
              Login
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-lg font-medium"
          >
            <FaShoppingCart />
            Cart ({cartItems.length})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;