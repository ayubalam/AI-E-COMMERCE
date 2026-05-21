import {
  useState,
} from "react";

import toast from "react-hot-toast";

import useCart from "../hooks/useCart";

import {

  checkoutPayment,

  verifyPayment,

} from "../services/paymentService";

const Checkout = () => {

  const {
    cartItems,
  } = useCart();

  // FORM DATA
  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      paymentMethod:
        "Razorpay",
    });

  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

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
    async (e) => {

      e.preventDefault();

      // EMPTY CART
      if (
        cartItems.length === 0
      ) {

        toast.error(
          "Cart is empty"
        );

        return;
      }

      try {

        // CREATE ORDER
        const order =
          await checkoutPayment(
            totalPrice
          );

        // RAZORPAY OPTIONS
        const options = {

          key:
            import.meta.env
              .VITE_RAZORPAY_KEY,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "AI Smart Commerce",

          description:
            "Order Payment",

          order_id:
            order.id,

handler:
  async function (
    response
  ) {

    try {

      // VERIFY PAYMENT
      const verify =
        await verifyPayment({
          razorpay_order_id:
            response
              .razorpay_order_id,

          razorpay_payment_id:
            response
              .razorpay_payment_id,

          razorpay_signature:
            response
              .razorpay_signature,
        });

      // CHECK VERIFIED
      if (
        verify.success
      ) {

        // ORDER DATA
      const orderData = {

  orderItems:
    cartItems,

  shippingInfo: {

    address:
      formData.address,

    city:
      formData.city,

    country:
      formData.country,
  },

  paymentMethod:
    "Razorpay",

  totalPrice,

  // PAYMENT STATUS
  isPaid: true,

  paidAt:
    new Date(),

  paymentResult: {

    id:
      response
        .razorpay_payment_id,

    status:
      "Paid",

    update_time:
      new Date(),

    email_address:
      formData.email,
  },
};

        // TOKEN
        const token =
          localStorage.getItem(
            "token"
          );

        // SAVE ORDER
        await fetch(
          "http://localhost:5000/api/orders",
          {
            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify(
                orderData
              ),
          }
        );

        // CLEAR CART
        localStorage.removeItem(
          "cartItems"
        );

        toast.success(
          "Payment Verified"
        );

        // REDIRECT
        window.location.href =
          "/success";

      } else {

        toast.error(
          "Payment Verification Failed"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Verification Failed"
      );
    }
  },

          prefill: {

            name:
              formData.name,

            email:
              formData.email,
          },

          theme: {
            color:
              "#2563eb",
          },
        };

        // OPEN RAZORPAY
        const paymentObject =
          new window.Razorpay(
            options
          );

        paymentObject.open();

      } catch (error) {

        console.log(error);

        toast.error(
          "Payment Failed"
        );
      }
    };

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold dark:text-white">
            Checkout
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            Complete your order
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">

            <form
              onSubmit={
                handleOrder
              }
              className="space-y-6"
            >

              {/* NAME */}
              <div>

                <label className="block font-semibold mb-2 dark:text-white">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter full name"
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block font-semibold mb-2 dark:text-white">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter email"
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                />

              </div>

              {/* ADDRESS */}
              <div>

                <label className="block font-semibold mb-2 dark:text-white">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter address"
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                />

              </div>

              {/* CITY */}
              <div>

                <label className="block font-semibold mb-2 dark:text-white">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={
                    formData.city
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter city"
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                />

              </div>

              {/* COUNTRY */}
              <div>

                <label className="block font-semibold mb-2 dark:text-white">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={
                    formData.country
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter country"
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                />

              </div>

              {/* PAYMENT */}
              <div>

                <label className="block font-semibold mb-2 dark:text-white">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={
                    formData.paymentMethod
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                >

                  <option>
                    Razorpay
                  </option>

                </select>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition duration-300"
              >

                Place Order

              </button>

            </form>
          </div>

          {/* RIGHT */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 h-fit">

            <h2 className="text-3xl font-bold dark:text-white mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cartItems.map(
                (item) => (

                  <div
                    key={item._id}
                    className="flex justify-between dark:text-white"
                  >

                    <span>
                      {item.name}
                      {" "}
                      x
                      {" "}
                      {item.qty}
                    </span>

                    <span>
                      ₹
                      {item.price *
                        item.qty}
                    </span>

                  </div>
                )
              )}

              {/* TOTAL */}
              <div className="border-t pt-5 flex justify-between text-xl font-bold dark:text-white">

                <span>
                  Total
                </span>

                <span className="text-blue-600">
                  ₹
                  {totalPrice.toFixed(
                    2
                  )}
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