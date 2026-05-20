import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaHeart,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import useCart from "../../hooks/useCart";

import useAuth from "../../hooks/useAuth";

import useWishlist from "../../hooks/useWishlist";

import useTheme from "../../hooks/useTheme";

const Navbar = () => {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const { cartItems } = useCart();

  const { wishlistItems } =
    useWishlist();

  const { user, logout } =
    useAuth();

  const { darkMode, toggleTheme } =
    useTheme();

  return (
    <nav className="w-full bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 transition duration-300">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          AI Smart Commerce
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          {/* Home */}
          <Link
            to="/"
            className="text-lg font-medium text-slate-700 dark:text-white hover:text-blue-600 transition duration-300"
          >
            Home
          </Link>

          {/* Products */}
          <Link
            to="/products"
            className="text-lg font-medium text-slate-700 dark:text-white hover:text-blue-600 transition duration-300"
          >
            Products
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-2xl text-slate-700 dark:text-white hover:text-red-500 transition duration-300"
          >
            <FaHeart />

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {wishlistItems.length}
            </span>
          </Link>

          {/* Dashboard */}
          {user && (
            <Link
              to="/dashboard"
              className="text-lg font-medium text-slate-700 dark:text-white hover:text-blue-600 transition duration-300"
            >
              Dashboard
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-2xl text-slate-700 dark:text-white hover:text-yellow-500 transition duration-300"
          >
            {darkMode ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </button>

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={logout}
              className="text-lg font-medium text-slate-700 dark:text-white hover:text-red-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium text-slate-700 dark:text-white hover:text-blue-600 transition duration-300"
            >
              Login
            </Link>
          )}

          {/* User */}
          {user && (
            <div className="flex items-center gap-2 text-slate-700 dark:text-white">

              <FaUserCircle className="text-2xl" />

              <span className="font-medium">
                {user.email}
              </span>
            </div>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-3xl text-slate-700 dark:text-white hover:text-blue-600 transition duration-300"
          >
            <FaShoppingCart />

            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-slate-700 dark:text-white"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg px-6 py-5 flex flex-col gap-5 transition duration-300">

          {/* Home */}
          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
            className="text-lg font-medium text-slate-700 dark:text-white"
          >
            Home
          </Link>

          {/* Products */}
          <Link
            to="/products"
            onClick={() =>
              setMenuOpen(false)
            }
            className="text-lg font-medium text-slate-700 dark:text-white"
          >
            Products
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            onClick={() =>
              setMenuOpen(false)
            }
            className="flex items-center gap-3 text-lg font-medium text-slate-700 dark:text-white"
          >
            <FaHeart />

            Wishlist (
            {wishlistItems.length})
          </Link>

          {/* Dashboard */}
          {user && (
            <Link
              to="/dashboard"
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-lg font-medium text-slate-700 dark:text-white"
            >
              Dashboard
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 text-lg font-medium text-slate-700 dark:text-white"
          >
            {darkMode ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}

            Theme
          </button>

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
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-lg font-medium text-slate-700 dark:text-white"
            >
              Login
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() =>
              setMenuOpen(false)
            }
            className="flex items-center gap-3 text-lg font-medium text-slate-700 dark:text-white"
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