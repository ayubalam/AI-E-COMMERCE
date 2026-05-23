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
  FaStar,
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

  const { addToCart } =
    useCart();

  const {
    addToWishlist,
  } = useWishlist();

  const [product,
    setProduct] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  // REVIEW
  const [rating,
    setRating] =
    useState(5);

  const [comment,
    setComment] =
    useState("");

  // QUANTITY
  const [qty,
    setQty] =
    useState(1);

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          // SINGLE PRODUCT
          const singleProduct =
            await getSingleProduct(
              id
            );

          setProduct(
            singleProduct
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load product"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchProduct();

  }, [id]);

  // SUBMIT REVIEW
  const submitReview =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:5000/api/products/${id}/review`,
            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({

                  rating,

                  comment,
                }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {

          toast.success(
            "Review Added"
          );

          setComment("");

          setRating(5);

          // REFRESH PRODUCT
          const updatedProduct =
            await getSingleProduct(
              id
            );

          setProduct(
            updatedProduct
          );

        } else {

          toast.error(
            data.message
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Review Failed"
        );
      }
    };

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-4xl font-bold dark:text-white">

        Loading...

      </div>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {

    return (
      <div className="min-h-screen flex items-center justify-center text-4xl font-bold text-red-500">

        Product Not Found

      </div>
    );
  }

  return (

    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* PRODUCT DETAILS */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-zoom-in"
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

            {/* RATING */}
            <div className="flex items-center gap-3 mt-5">

              <div className="flex items-center gap-1 text-yellow-500">

                <FaStar />

                <span className="font-bold">

                  {product.rating?.toFixed(
                    1
                  ) || 0}

                </span>

              </div>

              <span className="text-slate-500 dark:text-slate-300">

                (
                {product.numReviews}
                {" "}
                Reviews
                )

              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-slate-500 dark:text-slate-300 mt-6 text-lg leading-relaxed">

              {product.description}

            </p>

            {/* PRICE */}
            <h2 className="text-5xl font-bold text-blue-600 mt-8">

              ₹{product.price}

            </h2>

            {/* STOCK */}
            <div className="mt-5 flex items-center gap-3">

              <span className="text-lg dark:text-white">

                Stock:

              </span>

              {product.stock > 0 ? (

                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-semibold text-sm">

                  In Stock ({product.stock})

                </span>

              ) : (

                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">

                  Out Of Stock

                </span>

              )}

            </div>

            {/* QUANTITY */}
            <div className="mt-8">

              <label className="block mb-3 font-semibold dark:text-white">

                Quantity

              </label>

              <select
                value={qty}
                onChange={(e) =>
                  setQty(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-5 py-3 outline-none"
              >

                {[...Array(product.stock).keys()].map(
                  (x) => (

                    <option
                      key={x + 1}
                      value={x + 1}
                    >

                      {x + 1}

                    </option>
                  )
                )}

              </select>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">

              {/* CART */}
              <button
                onClick={() => {

                  addToCart({

                    ...product,

                    qty,
                  });

                  toast.success(
                    "Added To Cart"
                  );
                }}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
              >

                <FaShoppingCart />

                Add To Cart

              </button>

              {/* BUY NOW */}
              <button
                className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
              >

                Buy Now

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
                className="flex items-center gap-3 border border-slate-300 dark:border-slate-600 px-8 py-4 rounded-2xl font-semibold dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300"
              >

                <FaHeart />

                Wishlist

              </button>

            </div>

          </div>

        </div>

        {/* REVIEW SECTION */}
        <div className="mt-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-bold dark:text-white mb-8">

            Reviews & Ratings

          </h2>

          {/* REVIEW FORM */}
          <form
            onSubmit={
              submitReview
            }
            className="space-y-5 mb-10"
          >

            {/* RATING */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">

                Rating

              </label>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
              >

                <option value={1}>
                  1 Star
                </option>

                <option value={2}>
                  2 Stars
                </option>

                <option value={3}>
                  3 Stars
                </option>

                <option value={4}>
                  4 Stars
                </option>

                <option value={5}>
                  5 Stars
                </option>

              </select>

            </div>

            {/* COMMENT */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">

                Comment

              </label>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
                required
                rows={5}
                placeholder="Write your review..."
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
            >

              Submit Review

            </button>

          </form>

          {/* REVIEWS */}
          {product.reviews?.length === 0 ? (

            <p className="text-slate-500 dark:text-slate-300">

              No reviews yet

            </p>

          ) : (

            <div className="space-y-6">

              {product.reviews.map(
                (review) => (

                  <div
                    key={review._id}
                    className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6"
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="text-2xl font-bold dark:text-white">

                        {review.name}

                      </h3>

                      <div className="flex items-center gap-1 text-yellow-500">

                        <FaStar />

                        <span>

                          {review.rating}

                        </span>

                      </div>

                    </div>

                    <p className="text-slate-500 dark:text-slate-300 mt-4">

                      {review.comment}

                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </section>
  );
};

export default ProductDetails;