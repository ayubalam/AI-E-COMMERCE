import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useCart from "../hooks/useCart";

import toast from "react-hot-toast";

import {
  FaCreditCard,
  FaLock,
  FaTruck,
} from "react-icons/fa";

const Checkout = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
  } = useCart();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
    });

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Place Order
  const handleSubmit = (e) => {

    e.preventDefault();

    toast.success(
      "Order Placed Successfully 🚀"
    );

    // Redirect
    navigate("/success");
  };

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 py-16 transition duration-300">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold text-slate-800 dark:text-white">
            Checkout
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-4 text-lg">
            Complete your order details securely.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Billing Form */}
          <div className="lg:col-span-2">

            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 transition duration-300"
            >

              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
                Billing Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Name */}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
                />

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
                />

                {/* Phone */}
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
                />

                {/* City */}
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
                />

                {/* ZIP */}
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
                />

                {/* Address */}
                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="md:col-span-2 bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
                />
              </div>

              {/* Payment Info */}
              <div className="mt-10 bg-slate-100 dark:bg-slate-700 rounded-2xl p-6">

                <div className="flex items-center gap-3">

                  <FaCreditCard className="text-blue-600 text-2xl" />

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Payment Method
                  </h3>
                </div>

                <p className="text-slate-500 dark:text-slate-300 mt-4">
                  Secure online payment integration
                  coming soon with Stripe/Razorpay.
                </p>

                <div className="flex items-center gap-3 mt-5 text-green-600 font-semibold">

                  <FaLock />

                  Secure Checkout
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition duration-300"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 sticky top-28 transition duration-300">

              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                Order Summary
              </h2>

              {/* Items */}
              <div className="mt-8 space-y-5">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-4"
                  >

                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    {/* Product Info */}
                    <div className="flex-1">

                      <h3 className="font-bold dark:text-white">
                        {item.name}
                      </h3>

                      <p className="text-slate-500 dark:text-slate-300">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <span className="font-bold dark:text-white">
                      $
                      {item.price *
                        item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Shipping */}
              <div className="flex justify-between mt-8">

                <span className="dark:text-slate-300">
                  Shipping
                </span>

                <span className="text-green-600 font-bold flex items-center gap-2">
                  <FaTruck />

                  Free
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between mt-5">

                <span className="dark:text-slate-300">
                  Tax
                </span>

                <span className="font-bold dark:text-white">
                  $20
                </span>
              </div>

              {/* Divider */}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;