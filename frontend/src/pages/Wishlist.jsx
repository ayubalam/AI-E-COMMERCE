import useWishlist from "../hooks/useWishlist";

import useCart from "../hooks/useCart";

import toast from "react-hot-toast";

import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Wishlist = () => {

  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  // Empty Wishlist
  if (wishlistItems.length === 0) {

    return (
      <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-6 transition duration-300">

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-12 text-center max-w-lg w-full">

          <div className="flex justify-center">

            <FaHeart className="text-red-500 text-7xl" />
          </div>

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mt-8">
            Wishlist is Empty
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-5 text-lg">
            Save your favorite products to wishlist.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
          >
            Explore Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 py-16 transition duration-300">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold text-slate-800 dark:text-white">
            My Wishlist
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-4 text-lg">
            Your favorite saved products.
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {wishlistItems.map((item) => (

            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-72 object-cover"
              />

              {/* Content */}
              <div className="p-6">

                <p className="text-blue-600 font-semibold">
                  {item.category}
                </p>

                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-3">
                  {item.name}
                </h2>

                <p className="text-slate-500 dark:text-slate-300 mt-4 leading-relaxed">
                  Premium AI-powered smart product
                  with futuristic features.
                </p>

                <div className="mt-6">

                  <span className="text-3xl font-bold text-slate-800 dark:text-white">
                    ${item.price}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-8">

                  {/* Add To Cart */}
                  <button
                    onClick={() => {

                      addToCart(item);

                      toast.success(
                        "Added to cart"
                      );
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition duration-300"
                  >
                    <FaShoppingCart />

                    Cart
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => {

                      removeFromWishlist(
                        item.id
                      );

                      toast.success(
                        "Removed from wishlist"
                      );
                    }}
                    className="w-16 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;