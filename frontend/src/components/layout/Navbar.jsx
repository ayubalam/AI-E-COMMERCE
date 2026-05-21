import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaMoon,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";

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
    setDarkMode,
  } = useTheme();

  const {
    user,
    logout,
  } = useAuth();

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
              <Link
                to="/my-orders"
                className="font-semibold dark:text-white hover:text-blue-600 transition"
              >
                My Orders
              </Link>

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
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >

            {darkMode ? (

              <FaSun className="text-3xl text-yellow-400" />

            ) : (

              <FaMoon className="text-3xl text-slate-700 dark:text-white" />
            )}
          </button>

          {/* USER INFO */}
          {user ? (

            <div className="flex items-center gap-4">

              {/* PROFILE */}
              <div className="flex items-center gap-2">

                <FaUserCircle className="text-3xl text-slate-700 dark:text-white" />

                <span className="font-semibold dark:text-white">
                  {user.email}
                </span>

              </div>

              {/* LOGOUT */}
              <button
                onClick={
                  handleLogout
                }
                className="font-semibold text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>

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