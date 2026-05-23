import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaHeart,
  FaStar,
} from "react-icons/fa";

import useCart from "../../hooks/useCart";

import useWishlist from "../../hooks/useWishlist";

const ProductCard = ({ product }) => {

  const { addToCart } =
    useCart();

  const { addToWishlist } =
    useWishlist();

  return (

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-800 group">

      {/* PRODUCT IMAGE */}
      <Link
        to={`/products/${product._id || product.id}`}
      >

        <div className="overflow-hidden">

          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
          />

        </div>

      </Link>

      {/* CONTENT */}
      <div className="p-4">

        {/* CATEGORY */}
        <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">

          {product.category}

        </p>

        {/* NAME */}
        <h3 className="text-xl font-bold mt-2 text-slate-800 dark:text-white line-clamp-1">

          {product.name}

        </h3>

        {/* DESCRIPTION */}
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed line-clamp-2">

          {product.description}

        </p>

        {/* RATING */}
        <div className="flex items-center gap-2 mt-3">

          <FaStar className="text-yellow-400 text-sm" />

          <span className="font-semibold dark:text-white text-sm">

            {product.rating || 0}

          </span>

          <span className="text-slate-500 dark:text-slate-400 text-xs">

            ({product.stock} in stock)

          </span>

        </div>

        {/* PRICE */}
        <div className="mt-4">

          <span className="text-2xl font-bold text-slate-800 dark:text-white">

            ₹{product.price}

          </span>

        </div>

        {/* BUTTONS */}
      <div className="mt-4 grid grid-cols-2 gap-2">

          {/* ADD TO CART */}
          <button
            onClick={() => {

              addToCart(product);

              toast.success(
                "Product added to cart"
              );
            }}

            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
          >

            Add To Cart

          </button>

          {/* WISHLIST */}
          <button
            onClick={() => {

              addToWishlist(product);

              toast.success(
                "Added To Wishlist"
              );
            }}
           className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90"
          >

            <FaHeart />

            Wishlist

          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;