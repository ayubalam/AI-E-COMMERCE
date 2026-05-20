import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaHeart,
  FaStar,
} from "react-icons/fa";

import useCart from "../../hooks/useCart";

import useWishlist from "../../hooks/useWishlist";

const ProductCard = ({ product }) => {

  const { addToCart } = useCart();

  const { addToWishlist } =
    useWishlist();

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2">

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>

        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
      </Link>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="text-sm text-blue-600 font-medium">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="text-2xl font-bold mt-2 text-slate-800">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-slate-500 mt-3 text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">

          <FaStar className="text-yellow-400" />

          <span className="font-semibold">
            {product.rating}
          </span>

          <span className="text-slate-500 text-sm">
            ({product.stock} in stock)
          </span>
        </div>

        {/* Price */}
        <div className="mt-6">

          <span className="text-3xl font-bold text-slate-800">
            ${product.price}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">

          {/* Add To Cart */}
          <button
            onClick={() => {
              addToCart(product);

              toast.success(
                "Product added to cart"
              );
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition duration-300"
          >
            Add To Cart
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {

              addToWishlist(product);

              toast.success(
                "Added To Wishlist"
              );
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition duration-300"
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