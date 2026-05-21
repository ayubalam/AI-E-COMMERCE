import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getSingleProduct,
  getProducts,
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

  const [recommendedProducts,
    setRecommendedProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

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

          // ALL PRODUCTS
          const allProducts =
            await getProducts();

          // AI RECOMMENDATION
          const related =
            allProducts.filter(
              (item) =>
                item.category ===
                  singleProduct.category &&
                item._id !==
                  singleProduct._id
            );

          setRecommendedProducts(
            related
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
            <h2 className="text-5xl font-bold text-blue-600 mt-8">

              ${product.price}

            </h2>

            {/* STOCK */}
            <p className="mt-5 text-lg dark:text-white">

              Stock:
              {" "}
              <span className="font-bold">

                {product.stock}

              </span>

            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">

              {/* CART */}
              <button
                onClick={() => {

                  addToCart(product);

                  toast.success(
                    "Added To Cart"
                  );
                }}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
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
                className="flex items-center gap-3 border border-slate-300 dark:border-slate-600 px-8 py-4 rounded-2xl font-semibold dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300"
              >

                <FaHeart />

                Wishlist

              </button>

            </div>

          </div>

        </div>

        {/* AI RECOMMENDATIONS */}
        <div className="mt-20">

          <div className="mb-10">

            <h2 className="text-5xl font-bold dark:text-white">

              AI Recommendations

            </h2>

            <p className="text-slate-500 dark:text-slate-300 mt-3">

              Related products based on category

            </p>

          </div>

          {recommendedProducts.length === 0 ? (

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 text-center">

              <h3 className="text-3xl font-bold dark:text-white">

                No Recommendations Found

              </h3>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {recommendedProducts.map(
                (item) => (

                  <div
                    key={item._id}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300"
                  >

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />

                    {/* CONTENT */}
                    <div className="p-6">

                      <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

                        {item.category}

                      </span>

                      <h3 className="text-3xl font-bold dark:text-white mt-5">

                        {item.name}

                      </h3>

                      <p className="text-slate-500 dark:text-slate-300 mt-4 line-clamp-2">

                        {item.description}

                      </p>

                      <h4 className="text-4xl font-bold text-blue-600 mt-6">

                        ${item.price}

                      </h4>

                      <Link
                        to={`/products/${item._id}`}
                        className="block mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-center font-semibold transition duration-300"
                      >

                        View Product

                      </Link>

                    </div>

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