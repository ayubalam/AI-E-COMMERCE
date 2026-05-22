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
      phone: "",
      address: "",
      city: "",
      country: "",
      paymentMethod:
        "Razorpay",
    });

  // COUPON
  const [couponCode,
    setCouponCode] =
    useState("");

  const [discount,
    setDiscount] =
    useState(0);

  // TOTAL
  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.qty,
      0
    );

  // FINAL PRICE
  const [finalPrice,
    setFinalPrice] =
    useState(
      totalPrice
    );

  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // APPLY COUPON
  const applyCoupon =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/coupons/apply",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({

                  code:
                    couponCode,

                  totalAmount:
                    totalPrice,
                }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {

          setDiscount(
            data.discount
          );

          setFinalPrice(
            data.finalAmount
          );

          toast.success(
            "Coupon Applied"
          );

        } else {

          toast.error(
            data.message
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Coupon Failed"
        );
      }
    };

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

        // AUTO INDIA FORMAT
        const formattedPhone =
          formData.phone.startsWith(
            "+91"
          )
            ? formData.phone
            : `+91${formData.phone}`;

        // CREATE PAYMENT ORDER
        const order =
          await checkoutPayment(
            finalPrice
          );

        // CHECK RAZORPAY KEY
        if (
          !import.meta.env
            .VITE_RAZORPAY_KEY
        ) {

          toast.error(
            "Razorpay Key Missing"
          );

          return;
        }

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

          image:
            "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

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

                // PAYMENT VERIFIED
                if (
                  verify.success
                ) {

                  const orderData = {

                    orderItems:
                      cartItems,

                    shippingInfo: {

                      name:
                        formData.name,

                      email:
                        formData.email,

                      phone:
                        formattedPhone,

                      address:
                        formData.address,

                      city:
                        formData.city,

                      country:
                        formData.country,
                    },

                    paymentMethod:
                      "Razorpay",

                    totalPrice:
                      finalPrice,

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

                  console.log(token);

                  // SAVE ORDER
                  const saveOrder =
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

                  const savedData =
                    await saveOrder.json();

                  console.log(savedData);

                  // CHECK SUCCESS
                  if (
                    savedData.success
                  ) {

                    // CLEAR CART
                    localStorage.removeItem(
                      "cartItems"
                    );

                    toast.success(
                      "Order Placed Successfully"
                    );

                    // REDIRECT
                    window.location.href =
                      "/my-orders";

                  } else {

                    toast.error(
                      savedData.message ||
                      "Order Save Failed"
                    );
                  }

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

            contact:
              formData.phone,
          },

          theme: {
            color:
              "#2563eb",
          },
        };

        // OPEN PAYMENT
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
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                />

              </div>

              {/* PHONE */}
              <div>

                <label className="block font-semibold mb-2 dark:text-white">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
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
                  value={formData.address}
                  onChange={handleChange}
                  required
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
                  value={formData.city}
                  onChange={handleChange}
                  required
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
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-4 outline-none"
                />

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

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold dark:text-white">
                Order Summary
              </h2>

              <span className="text-lg font-semibold text-slate-600 dark:text-slate-300">

                Items {" "}

                {
                  cartItems.reduce(
                    (acc, item) =>
                      acc + item.qty,
                    0
                  )
                }

              </span>

            </div>

            <div className="space-y-5">

              {cartItems.map(
                (item) => (

                  <div
                    key={item._id}
                    className="flex justify-between dark:text-white"
                  >

                    <span>
                      {item.name} x {item.qty}
                    </span>

                    <span>
                      ₹{item.price * item.qty}
                    </span>

                  </div>
                )
              )}

              {/* COUPON */}
              <div className="border-t pt-5">

                <label className="block font-semibold mb-3 dark:text-white">
                  Coupon Code
                </label>

                <div className="flex gap-3">

                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(
                        e.target.value
                      )
                    }
                    placeholder="Enter coupon"
                    className="flex-1 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-3 outline-none"
                  />

                  <button
                    type="button"
                    onClick={
                      applyCoupon
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-2xl font-semibold"
                  >

                    Apply

                  </button>

                </div>

              </div>

              {/* DISCOUNT */}
              <div className="flex justify-between dark:text-white">

                <span>
                  Discount
                </span>

                <span className="text-green-500">
                  -₹{discount.toFixed(2)}
                </span>

              </div>

              {/* TOTAL */}
              <div className="border-t pt-5 flex justify-between text-xl font-bold dark:text-white">

                <span>
                  Total
                </span>

                <span className="text-blue-600">
                  ₹{finalPrice.toFixed(2)}
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