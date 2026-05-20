import { Link } from "react-router-dom";

import {
  FaCheckCircle,
} from "react-icons/fa";

const Success = () => {

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-6 transition duration-300">

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">

        {/* Icon */}
        <div className="flex justify-center">

          <FaCheckCircle className="text-green-500 text-8xl" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-slate-800 dark:text-white mt-8">
          Order Successful!
        </h1>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-300 text-lg mt-6 leading-relaxed">
          Thank you for shopping with AI Smart Commerce.
          Your order has been placed successfully
          and will be delivered soon 🚀
        </p>

        {/* Order Info */}
        <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 mt-10">

          <div className="flex justify-between mb-4">

            <span className="font-semibold dark:text-white">
              Order ID
            </span>

            <span className="text-blue-600 font-bold">
              #AI2026X91
            </span>
          </div>

          <div className="flex justify-between mb-4">

            <span className="font-semibold dark:text-white">
              Payment
            </span>

            <span className="text-green-600 font-bold">
              Successful
            </span>
          </div>

          <div className="flex justify-between">

            <span className="font-semibold dark:text-white">
              Delivery
            </span>

            <span className="dark:text-white">
              3-5 Business Days
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-10">

          <Link
            to="/products"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition duration-300"
          >
            Continue Shopping
          </Link>

          <Link
            to="/dashboard"
            className="flex-1 border-2 border-slate-300 dark:border-slate-600 dark:text-white py-4 rounded-2xl text-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;