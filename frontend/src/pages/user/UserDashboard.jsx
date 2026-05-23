import {
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaArrowRight,
  FaDollarSign,
} from "react-icons/fa";

import {
  Link,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import useAuth
  from "../../hooks/useAuth";

import useCart
  from "../../hooks/useCart";

import useWishlist
  from "../../hooks/useWishlist";

import ProductCard
  from "../../components/products/ProductCard";

const UserDashboard = () => {

  const {
    user,
  } = useAuth();

  const {
    cartItems,
  } = useCart();

  const {
    wishlistItems,
  } = useWishlist();

  // DASHBOARD DATA
  const [dashboardData,
    setDashboardData] =
    useState({

      totalOrders: 0,

      totalSpent: 0,

      recentOrders: [],
    });

  // RECOMMENDED PRODUCTS
  const [recommendedProducts,
    setRecommendedProducts] =
    useState([]);

  // LOADING
  const [loading,
    setLoading] =
    useState(true);

  // FETCH DASHBOARD DATA
  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          // DASHBOARD STATS
          const { data } =
            await axios.get(

              "http://localhost:5000/api/orders/dashboard-stats",

              {
                headers: {

                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setDashboardData({

            totalOrders:
              data.totalOrders || 0,

            totalSpent:
              data.totalSpent || 0,

            recentOrders:
              data.recentOrders || [],
          });

          // AI RECOMMENDED PRODUCTS
          const recommended =
            await axios.get(

              "http://localhost:5000/api/products/recommended/products"
            );

          setRecommendedProducts(
            recommended.data.products
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchDashboard();

  }, []);

  return (

    <section className="min-h-screen bg-slate-100 dark:bg-slate-950 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl mb-10 relative overflow-hidden">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            {/* LEFT */}
            <div>

              <h1 className="text-5xl font-bold mb-4">

                Welcome Back 👋

              </h1>

              <p className="text-lg text-blue-100">

                Manage your orders, wishlist and shopping activity.

              </p>

            </div>

            {/* PROFILE */}
            <div className="flex items-center gap-5">

              <Link to="/profile">

                <img
                  src={
                    user?.avatar ||

                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl cursor-pointer hover:scale-105 transition duration-300"
                />

              </Link>

              <div>

                <h2 className="text-2xl font-bold">

                  {user?.name}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center shadow-xl">

            <h2 className="text-3xl font-bold dark:text-white">

              Loading Dashboard...

            </h2>

          </div>

        ) : (

          <>

            {/* STATS */}
            <div className="grid md:grid-cols-4 gap-8 mb-10">

              {/* ORDERS */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition duration-300">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-500 dark:text-slate-400 text-lg">

                      Orders

                    </p>

                    <h2 className="text-5xl font-bold mt-4 dark:text-white">

                      {dashboardData.totalOrders}

                    </h2>

                  </div>

                  <div className="bg-blue-100 dark:bg-slate-800 p-5 rounded-2xl">

                    <FaShoppingBag className="text-4xl text-blue-600" />

                  </div>

                </div>

              </div>

              {/* WISHLIST */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition duration-300">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-500 dark:text-slate-400 text-lg">

                      Wishlist

                    </p>

                    <h2 className="text-5xl font-bold mt-4 dark:text-white">

                      {wishlistItems.length}

                    </h2>

                  </div>

                  <div className="bg-red-100 dark:bg-slate-800 p-5 rounded-2xl">

                    <FaHeart className="text-4xl text-red-500" />

                  </div>

                </div>

              </div>

              {/* CART */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition duration-300">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-500 dark:text-slate-400 text-lg">

                      Cart Items

                    </p>

                    <h2 className="text-5xl font-bold mt-4 dark:text-white">

                      {cartItems.length}

                    </h2>

                  </div>

                  <div className="bg-green-100 dark:bg-slate-800 p-5 rounded-2xl">

                    <FaShoppingCart className="text-4xl text-green-600" />

                  </div>

                </div>

              </div>

              {/* TOTAL SPENT */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition duration-300">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-500 dark:text-slate-400 text-lg">

                      Total Spent

                    </p>

                    <h2 className="text-4xl font-bold mt-4 dark:text-white">

                      ₹{dashboardData.totalSpent}

                    </h2>

                  </div>

                  <div className="bg-yellow-100 dark:bg-slate-800 p-5 rounded-2xl">

                    <FaDollarSign className="text-4xl text-yellow-500" />

                  </div>

                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-bold dark:text-white">

                  Quick Actions

                </h2>

                <FaUserCircle className="text-4xl text-blue-600" />

              </div>

              <div className="grid md:grid-cols-4 gap-6">

                <Link
                  to="/profile"
                  className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 hover:bg-blue-600 hover:text-white transition duration-300 group"
                >

                  <h3 className="text-xl font-bold mb-3">

                    Profile

                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white">

                    Manage your profile

                  </p>

                </Link>

                <Link
                  to="/my-orders"
                  className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 hover:bg-green-600 hover:text-white transition duration-300 group"
                >

                  <h3 className="text-xl font-bold mb-3">

                    Orders

                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white">

                    View your purchases

                  </p>

                </Link>

                <Link
                  to="/wishlist"
                  className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 hover:bg-pink-600 hover:text-white transition duration-300 group"
                >

                  <h3 className="text-xl font-bold mb-3">

                    Wishlist

                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white">

                    Saved favorite items

                  </p>

                </Link>

                <Link
                  to="/products"
                  className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 hover:bg-purple-600 hover:text-white transition duration-300 group"
                >

                  <h3 className="text-xl font-bold mb-3">

                    Shop

                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white">

                    Explore products

                  </p>

                </Link>

              </div>

            </div>

            {/* RECENT ORDERS */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 mt-10">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-bold dark:text-white">

                  Recent Orders

                </h2>

                <Link
                  to="/my-orders"
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                >

                  View All

                  <FaArrowRight />

                </Link>

              </div>

              {dashboardData.recentOrders.length === 0 ? (

                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 text-center">

                  <h3 className="text-2xl font-bold dark:text-white mb-3">

                    No recent orders yet

                  </h3>

                  <p className="text-slate-500 dark:text-slate-400">

                    Start shopping to see your recent activity here.

                  </p>

                </div>

              ) : (

                <div className="space-y-5">

                  {dashboardData.recentOrders.map(
                    (order) => (

                      <div
                        key={order._id}
                        className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      >

                        <div>

                          <h3 className="text-xl font-bold dark:text-white">

                            Order #{order._id.slice(-6)}

                          </h3>

                          <p className="text-slate-500 dark:text-slate-400 mt-2">

                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}

                          </p>

                        </div>

                        <div>

                          <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold">

                            {order.orderStatus || "Processing"}

                          </span>

                        </div>

                        <div className="text-2xl font-bold text-blue-600">

                          ₹{order.totalPrice}

                        </div>

                      </div>
                    )
                  )}

                </div>

              )}

            </div>

            {/* AI RECOMMENDATIONS */}
            <div className="mt-12">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-4xl font-bold dark:text-white">

                    Recommended For You

                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-2">

                    AI-powered product recommendations based on trending and top-rated items.

                  </p>

                </div>

              </div>

              {recommendedProducts.length === 0 ? (

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center shadow-lg">

                  <p className="text-slate-500 dark:text-slate-400 text-lg">

                    No recommendations available

                  </p>

                </div>

              ) : (

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                  {recommendedProducts.map(
                    (product) => (

                      <ProductCard
                        key={product._id}
                        product={product}
                      />
                    )
                  )}

                </div>

              )}

            </div>

          </>

        )}

      </div>

    </section>
  );
};

export default UserDashboard;