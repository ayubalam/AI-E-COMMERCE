import useCart from "../hooks/useCart";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowRight,
} from "react-icons/fa";

const Cart = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
  } = useCart();

  // Empty Cart
  if (cartItems.length === 0) {

    return (
      <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-6 transition duration-300">

        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Your Cart is Empty
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-5 text-lg">
            Add products to your cart and start shopping.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
          >
            Continue Shopping
          </button>
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
            Shopping Cart
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-4 text-lg">
            Review your selected products before checkout.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-6 transition duration-300"
              >

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-52 h-52 object-cover rounded-2xl"
                />

                {/* Product Content */}
                <div className="flex-1">

                  <p className="text-blue-600 font-semibold">
                    {item.category}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                    {item.name}
                  </h2>

                  <p className="text-slate-500 dark:text-slate-300 mt-3 leading-relaxed">
                    Premium AI-powered product with modern technology and advanced features.
                  </p>

                  <p className="text-2xl font-bold mt-5 text-slate-700 dark:text-slate-200">
                    ${item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-6">

                    {/* Decrease */}
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="bg-slate-200 dark:bg-slate-700 dark:text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-300 transition duration-300"
                    >
                      <FaMinus />
                    </button>

                    {/* Quantity */}
                    <span className="text-xl font-bold dark:text-white">
                      {item.quantity}
                    </span>

                    {/* Increase */}
                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="bg-slate-200 dark:bg-slate-700 dark:text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-300 transition duration-300"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => {

                    removeItem(item.id);

                    toast.success(
                      "Removed from cart"
                    );
                  }}
                  className="text-red-500 hover:text-red-700 text-2xl self-start transition duration-300"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 sticky top-28 transition duration-300">

              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                Order Summary
              </h2>

              {/* Total Items */}
              <div className="flex justify-between mt-8 text-lg">

                <span className="dark:text-slate-300">
                  Total Items
                </span>

                <span className="font-bold dark:text-white">
                  {cartItems.length}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between mt-5 text-lg">

                <span className="dark:text-slate-300">
                  Shipping
                </span>

                <span className="font-bold text-green-600">
                  Free
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between mt-5 text-lg">

                <span className="dark:text-slate-300">
                  Tax
                </span>

                <span className="font-bold dark:text-white">
                  $20
                </span>
              </div>

              <div className="border-t dark:border-slate-700 my-8"></div>

              {/* Total */}
              <div className="flex justify-between items-center">

                <span className="text-2xl font-bold dark:text-white">
                  Total
                </span>

                <span className="text-3xl font-bold text-blue-600">
                  ${totalPrice + 20}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 flex items-center justify-center gap-3"
              >
                Proceed To Checkout

                <FaArrowRight />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() =>
                  navigate("/products")
                }
                className="w-full mt-4 border-2 border-slate-300 dark:border-slate-600 dark:text-white py-4 rounded-2xl text-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;