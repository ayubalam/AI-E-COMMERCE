import { useParams } from "react-router-dom";

import products from "../data/products";

import useCart from "../hooks/useCart";

import useWishlist from "../hooks/useWishlist";

import toast from "react-hot-toast";

import { FaHeart } from "react-icons/fa";

const ProductDetails = () => {

  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    addToWishlist,
    wishlistItems,
  } = useWishlist();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Product Not Found
      </div>
    );
  }

  const alreadyWishlisted =
    wishlistItems.some(
      (item) => item.id === product.id
    );

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Product Image */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Product Info */}
          <div>

            <p className="text-blue-600 font-semibold text-lg">
              {product.category}
            </p>

            <h1 className="text-5xl font-bold text-slate-800 dark:text-white mt-4">
              {product.name}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg mt-6 leading-relaxed">
              Experience premium AI-powered technology
              with smart features, high performance,
              and futuristic design.
            </p>

            <div className="mt-8">

              <span className="text-4xl font-bold text-slate-900 dark:text-white">
                ${product.price}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">

              {/* Add To Cart */}
              <button
                onClick={() => {
                  addToCart(product);

                  toast.success(
                    "Added to cart"
                  );
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"
              >
                Add To Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  addToWishlist(product);

                  toast.success(
                    "Added to wishlist"
                  );
                }}
                disabled={alreadyWishlisted}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold transition
                  
                  ${
                    alreadyWishlisted
                      ? "bg-pink-200 text-pink-700 cursor-not-allowed"
                      : "bg-pink-500 hover:bg-pink-600 text-white"
                  }
                `}
              >
                <FaHeart />

                {alreadyWishlisted
                  ? "Wishlisted"
                  : "Add Wishlist"}
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-12 grid sm:grid-cols-3 gap-5">

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
                <h3 className="font-bold text-lg dark:text-white">
                  Free Shipping
                </h3>

                <p className="text-slate-500 mt-2">
                  Delivery within 3-5 days
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
                <h3 className="font-bold text-lg dark:text-white">
                  Warranty
                </h3>

                <p className="text-slate-500 mt-2">
                  1 Year Official Warranty
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
                <h3 className="font-bold text-lg dark:text-white">
                  Secure Payment
                </h3>

                <p className="text-slate-500 mt-2">
                  100% secure transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;