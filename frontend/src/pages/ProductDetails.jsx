import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getSingleProduct,
} from "../services/productService";

import useCart from "../hooks/useCart";

import useWishlist from "../hooks/useWishlist";

const ProductDetails = () => {

  const { id } =
    useParams();

  // CART
  const { addToCart } =
    useCart();

  // WISHLIST
  const {
    addToWishlist,
  } = useWishlist();

  const [product,
    setProduct] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const data =
            await getSingleProduct(
              id
            );

          setProduct(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchProduct();

  }, [id]);

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold dark:text-white">
        Loading...
      </div>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {

    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="h-full">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

          </div>

          {/* CONTENT */}
          <div className="p-8 flex flex-col justify-center">

            {/* CATEGORY */}
            <span className="text-blue-600 font-semibold text-lg">
              {product.category}
            </span>

            {/* TITLE */}
            <h1 className="text-5xl font-bold text-slate-800 dark:text-white mt-3">
              {product.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-slate-500 dark:text-slate-300 mt-6 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* PRICE */}
            <div className="mt-8">

              <span className="text-4xl font-bold text-blue-600">
                ${product.price}
              </span>

            </div>

            {/* STOCK */}
            <div className="mt-4">

              <span className="font-semibold dark:text-white">
                Stock:
              </span>{" "}

              <span className="text-slate-600 dark:text-slate-300">
                {product.stock}
              </span>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">

              {/* ADD TO CART */}
              <button
                onClick={() => {

                  addToCart(
                    product
                  );

                  toast.success(
                    "Added to Cart"
                  );
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
              >

                <FaShoppingCart />

                Add To Cart

              </button>

              {/* WISHLIST */}
              <button
                onClick={() => {

                  addToWishlist(
                    product
                  );

                  toast.success(
                    "Added To Wishlist"
                  );
                }}
                className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 px-8 py-4 rounded-2xl font-semibold dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300"
              >

                <FaHeart />

                Wishlist

              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;