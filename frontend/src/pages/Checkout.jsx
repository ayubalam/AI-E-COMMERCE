import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import useCart from "../hooks/useCart";

const Checkout = () => {

  const navigate =
    useNavigate();

  const {
    cartItems,
    clearCart,
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

  // PLACE ORDER
  const handleOrder =
    () => {

      toast.success(
        "Order Placed Successfully 🚀"
      );

      clearCart();

      navigate(
        "/dashboard"
      );
    };

  // EMPTY CART
  if (
    cartItems.length === 0
  ) {

    return (
      <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4">

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 text-center max-w-lg w-full">

          <h1 className="text-4xl font-bold dark:text-white">

            Cart is Empty

          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-4">

            Add products before checkout

          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-6xl mx-auto">

        {/* TOP */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold dark:text-white">

            Checkout

          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">

            Complete your order

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

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

                    <h2 className="text-3xl font-bold dark:text-white">

                      {item.name}

                    </h2>

                    <p className="text-slate-500 dark:text-slate-300 mt-3">

                      {item.category}

                    </p>

                    <h3 className="text-4xl font-bold text-blue-600 mt-5">

                      ${item.price}

                    </h3>

                    <p className="mt-4 text-lg dark:text-white">

                      Quantity:
                      {" "}
                      <span className="font-bold">

                        {item.qty}

                      </span>

                    </p>

                  </div>

                </div>
              )
            )}

          </div>

          {/* RIGHT */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 h-fit">

            <h2 className="text-4xl font-bold dark:text-white mb-8">

              Order Summary

            </h2>

            <div className="space-y-5">

              <div className="flex justify-between text-lg dark:text-white">

                <span>
                  Products
                </span>

                <span>
                  {
                    cartItems.length
                  }
                </span>

              </div>

              <div className="flex justify-between text-lg dark:text-white">

                <span>
                  Total Price
                </span>

                <span className="font-bold text-blue-600">

                  $
                  {totalPrice.toFixed(
                    2
                  )}

                </span>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={
                handleOrder
              }
              className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition duration-300"
            >

              Place Order

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Checkout;