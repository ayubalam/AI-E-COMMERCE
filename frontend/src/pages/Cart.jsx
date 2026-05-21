import {
  FaTrash,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

import useCart from "../hooks/useCart";

const Cart = () => {

  const {
    cartItems,
    removeFromCart,
    addToCart,
    decreaseQty,
  } = useCart();

  // TOTAL
  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.qty,
      0
    );

  // EMPTY
  if (
    cartItems.length === 0
  ) {

    return (
      <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4">

        <div className="text-center">

          <h1 className="text-4xl font-bold dark:text-white">
            Cart is Empty
          </h1>

          <p className="text-slate-500 mt-3">
            Add products to cart
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold dark:text-white">
            Shopping Cart
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            Manage your products
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {cartItems.map(
              (item) => (

                <div
                  key={item._id}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-5 flex flex-col md:flex-row gap-5"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-40 h-40 object-cover rounded-2xl"
                  />

                  {/* CONTENT */}
                  <div className="flex-1">

                    <h2 className="text-2xl font-bold dark:text-white">
                      {item.name}
                    </h2>

                    <p className="text-slate-500 dark:text-slate-300 mt-2">
                      {item.category}
                    </p>

                    <h3 className="text-3xl font-bold text-blue-600 mt-4">
                      $
                      {item.price}
                    </h3>

                    {/* QTY */}
                    <div className="flex items-center gap-4 mt-5">

                      {/* PLUS */}
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
                        onClick={() =>
                          addToCart(
                            item
                          )
                        }
                      >
                        <FaPlus />
                      </button>

                      {/* QTY */}
                      <span className="text-2xl font-bold dark:text-white">
                        {item.qty}
                      </span>

                      {/* MINUS */}
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl"
                        onClick={() =>
                          decreaseQty(
                            item._id
                          )
                        }
                      >
                        <FaMinus />
                      </button>

                      {/* DELETE */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                        onClick={() =>
                          removeFromCart(
                            item._id
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 h-fit">

            <h2 className="text-3xl font-bold dark:text-white mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between text-lg dark:text-white">

                <span>
                  Items
                </span>

                <span>
                  {cartItems.length}
                </span>

              </div>

              <div className="flex justify-between text-lg dark:text-white">

                <span>
                  Total
                </span>

                <span className="font-bold text-blue-600">
                  $
                  {totalPrice.toFixed(
                    2
                  )}
                </span>

              </div>
            </div>

            <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition duration-300">

              Checkout

            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;