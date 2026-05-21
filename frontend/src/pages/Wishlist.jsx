import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

import toast from "react-hot-toast";

import useWishlist from "../hooks/useWishlist";

import useCart from "../hooks/useCart";

const Wishlist = () => {

  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } =
    useCart();

  // EMPTY
  if (
    wishlistItems.length === 0
  ) {

    return (
      <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4">

        <div className="text-center">

          <FaHeart className="text-6xl text-red-500 mx-auto mb-5" />

          <h1 className="text-4xl font-bold dark:text-white">
            Wishlist Empty
          </h1>

          <p className="text-slate-500 mt-3">
            Save your favorite products
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold dark:text-white">
            Wishlist
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            Your saved products
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {wishlistItems.map(
            (item) => (

              <div
                key={item._id}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />

                {/* CONTENT */}
                <div className="p-6">

                  <span className="text-blue-600 font-semibold">
                    {item.category}
                  </span>

                  <h2 className="text-2xl font-bold mt-2 dark:text-white">
                    {item.name}
                  </h2>

                  <p className="text-slate-500 dark:text-slate-300 mt-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-3xl font-bold text-blue-600">
                      ${item.price}
                    </span>

                    <button
                      onClick={() => {

                        removeFromWishlist(
                          item._id
                        );

                        toast.success(
                          "Removed"
                        );
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    onClick={() => {

                      addToCart(item);

                      toast.success(
                        "Added to cart"
                      );
                    }}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition duration-300"
                  >

                    <FaShoppingCart />

                    Add To Cart

                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;