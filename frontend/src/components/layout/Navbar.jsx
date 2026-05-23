import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaMoon,
  FaSun,
  FaBell,
} from "react-icons/fa";

import {
  useState,
  useEffect,
} from "react";

import useCart from "../../hooks/useCart";

import useWishlist from "../../hooks/useWishlist";

import useTheme from "../../hooks/useTheme";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {

  const navigate =
    useNavigate();

  const {
    cartItems,
  } = useCart();

  const {
    wishlistItems,
  } = useWishlist();

  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  const {
    user,
    logout,
  } = useAuth();

  const [showDropdown,
    setShowDropdown] =
    useState(false);

  const [showNotifications,
    setShowNotifications] =
    useState(false);

  const [notifications,
    setNotifications] =
    useState([]);

  // LOAD NOTIFICATIONS
  useEffect(() => {

    const loadNotifications =
      () => {

        const savedNotifications =
          JSON.parse(
            localStorage.getItem(
              "notifications"
            )
          ) || [];

        setNotifications(
          savedNotifications
        );
      };

    // INITIAL LOAD
    loadNotifications();

    // AUTO REFRESH
    const interval =
      setInterval(() => {

        loadNotifications();

      }, 1000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // CLEAR NOTIFICATIONS
  const clearNotifications =
    () => {

      localStorage.removeItem(
        "notifications"
      );

      setNotifications([]);
    };

  // LOGOUT
  const handleLogout =
    () => {

      logout();

      navigate("/login");
    };

  return (

    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-4xl font-bold text-blue-600"
        >

          AI Smart Commerce

        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-8">

          {/* HOME */}
          <Link
            to="/"
            className="font-semibold dark:text-white hover:text-blue-600 transition"
          >

            Home

          </Link>

          {/* PRODUCTS */}
          <Link
            to="/products"
            className="font-semibold dark:text-white hover:text-blue-600 transition"
          >

            Products

          </Link>

          {/* USER ROUTES */}
          {user && (
            <>

              {/* DASHBOARD */}
              <Link
                to="/dashboard"
                className="font-semibold dark:text-white hover:text-blue-600 transition"
              >

                Dashboard

              </Link>

              {/* MY ORDERS */}
              {user.role !== "admin" && (

                <Link
                  to="/my-orders"
                  className="font-semibold dark:text-white hover:text-blue-600 transition"
                >

                  My Orders

                </Link>
              )}

              {/* ADMIN ONLY */}
              {user.role === "admin" && (

                <div className="flex items-center gap-5">

                  {/* ADD PRODUCT */}
                  <Link
                    to="/admin/add-product"
                    className="font-semibold text-blue-600 hover:text-blue-700 transition"
                  >

                    Add Product

                  </Link>

                  {/* MANAGE PRODUCTS */}
                  <Link
                    to="/admin/products"
                    className="font-semibold text-green-600 hover:text-green-700 transition"
                  >

                    Manage Products

                  </Link>

                  {/* MANAGE ORDERS */}
                  <Link
                    to="/admin/orders"
                    className="font-semibold text-purple-600 hover:text-purple-700 transition"
                  >

                    Manage Orders

                  </Link>

                </div>
              )}

            </>
          )}

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="relative"
          >

            <FaHeart className="text-3xl text-slate-700 dark:text-white" />

            {wishlistItems.length > 0 && (

              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">

                {wishlistItems.length}

              </span>
            )}

          </Link>

          {/* THEME */}
          <button
            onClick={toggleTheme}
          >

            {darkMode ? (

              <FaSun className="text-3xl text-yellow-400" />

            ) : (

              <FaMoon className="text-3xl text-slate-700 dark:text-white" />

            )}

          </button>

          {/* NOTIFICATIONS */}
          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="relative"
            >

              <FaBell className="text-3xl text-slate-700 dark:text-white hover:text-blue-600 transition" />

              {/* COUNT */}
              {notifications.length > 0 && (

                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">

                  {notifications.length}

                </span>
              )}

            </button>

            {/* DROPDOWN */}
            {showNotifications && (

              <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50">

                {/* TOP */}
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">

                  <h2 className="text-xl font-bold dark:text-white">

                    Notifications

                  </h2>

                  {notifications.length > 0 && (

                    <button
                      onClick={
                        clearNotifications
                      }
                      className="text-sm text-red-500 hover:text-red-600 font-semibold"
                    >

                      Clear

                    </button>
                  )}

                </div>

                {/* EMPTY */}
                {notifications.length === 0 && (

                  <div className="px-5 py-10 text-center">

                    <p className="text-slate-500 dark:text-slate-400">

                      No notifications yet

                    </p>

                  </div>
                )}

                {/* ITEMS */}
                <div className="max-h-96 overflow-y-auto">

                  {notifications.map(
                    (item) => (

                      <div
                        key={item.id}
                        className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                      >

                        <p className="font-semibold dark:text-white">

                          {item.title}

                        </p>

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </div>

          {/* USER INFO */}
          {user ? (

            <div className="relative">

              {/* PROFILE IMAGE */}
              <button
                onClick={() =>
                  setShowDropdown(
                    !showDropdown
                  )
                }
                className="flex items-center"
              >

                <img
                  src={
                    user?.avatar ||

                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 cursor-pointer hover:scale-110 transition duration-300"
                />

              </button>

              {/* DROPDOWN */}
              {showDropdown && (

                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50">

                  {/* USER */}
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">

                    <img
                      src={
                        user?.avatar ||

                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="profile"
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                    />

                    <div>

                      <h3 className="font-bold dark:text-white">

                        {user?.name}

                      </h3>

                      <p className="text-sm text-slate-500 dark:text-slate-400">

                        {user?.email}

                      </p>

                    </div>

                  </div>

                  {/* MENU */}
                  <div className="flex flex-col mt-4">

                    {/* PROFILE */}
                    <Link
                      to="/profile"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                      className="px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white transition"
                    >

                      Profile

                    </Link>

                    {/* DASHBOARD */}
                    <Link
                      to="/dashboard"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                      className="px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white transition"
                    >

                      Dashboard

                    </Link>

                    {/* ORDERS */}
                    <Link
                      to="/my-orders"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                      className="px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white transition"
                    >

                      My Orders

                    </Link>

                    {/* LOGOUT */}
                    <button
                      onClick={
                        handleLogout
                      }
                      className="text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 transition"
                    >

                      Logout

                    </button>

                  </div>

                </div>
              )}

            </div>

          ) : (

            <Link
              to="/login"
              className="font-semibold dark:text-white hover:text-blue-600 transition"
            >

              Login

            </Link>
          )}

          {/* CART */}
          <Link
            to="/cart"
            className="relative"
          >

            <FaShoppingCart className="text-4xl text-slate-700 dark:text-white" />

            {cartItems.length > 0 && (

              <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">

                {cartItems.length}

              </span>
            )}

          </Link>

        </nav>

      </div>

    </header>
  );
};

export default Navbar;