import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import jsPDF from "jspdf";

import {
  getMyOrders,
} from "../services/orderService";

const MyOrders = () => {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH ORDERS
  useEffect(() => {

    const fetchOrders =
      async () => {

        try {
const token =
  localStorage.getItem(
    "token"
  );
          console.log(token);

          const data =
            await getMyOrders(
              token
            );

          setOrders(data);

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load orders"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchOrders();

  }, []);

  // DOWNLOAD INVOICE
  const downloadInvoice =
    (order) => {

      const doc =
        new jsPDF();

      // TITLE
      doc.setFontSize(22);

      doc.text(
        "AI Smart Commerce Invoice",
        20,
        20
      );

      // ORDER INFO
      doc.setFontSize(14);

      doc.text(
        `Order ID: ${order._id}`,
        20,
        40
      );

      doc.text(
        `Customer Name: ${
          order.shippingInfo?.name ||
          "N/A"
        }`,
        20,
        50
      );

      doc.text(
        `Customer Email: ${
          order.shippingInfo?.email ||
          "N/A"
        }`,
        20,
        60
      );

      doc.text(
        `Payment Method: ${order.paymentMethod}`,
        20,
        70
      );

      doc.text(
        `Order Status: ${order.orderStatus}`,
        20,
        80
      );

      doc.text(
        `Tracking Number: ${
          order.trackingNumber ||
          "N/A"
        }`,
        20,
        90
      );

      doc.text(
        `Courier Service: ${
          order.courierService ||
          "N/A"
        }`,
        20,
        100
      );

      doc.text(
        `Total Amount: ₹${order.totalPrice}`,
        20,
        110
      );

      // PRODUCTS
      let y = 130;

      doc.setFontSize(18);

      doc.text(
        "Products",
        20,
        y
      );

      y += 15;

      order.orderItems.forEach(
        (item, index) => {

          doc.setFontSize(13);

          doc.text(
            `${index + 1}. ${item.name}`,
            20,
            y
          );

          y += 10;

          doc.text(
            `Quantity: ${item.qty}`,
            30,
            y
          );

          y += 10;

          doc.text(
            `Price: ₹${item.price}`,
            30,
            y
          );

          y += 15;
        }
      );

      // FOOTER
      doc.setFontSize(12);

      doc.text(
        "Thank you for shopping with AI Smart Commerce!",
        20,
        y + 10
      );

      // SAVE PDF
      doc.save(
        `invoice_${order._id}.pdf`
      );
    };

  // LOADING
  if (loading) {

    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">

        <h1 className="text-4xl font-bold dark:text-white">
          Loading Orders...
        </h1>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold dark:text-white">
            My Orders
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            View your order history
          </p>

        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 text-center">

            <h2 className="text-3xl font-bold dark:text-white">
              No Orders Found
            </h2>

          </div>

        ) : (

          <div className="space-y-8">

            {orders.map(
              (order) => (

                <div
                  key={order._id}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden"
                >

                  {/* HEADER */}
                  <div className="bg-slate-200 dark:bg-slate-700 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold dark:text-white">

                        Order ID

                      </h2>

                      <p className="text-slate-600 dark:text-slate-300 break-all">

                        {order._id}

                      </p>

                    </div>

                    <div className="flex gap-5 flex-wrap">

                      {/* PAYMENT */}
                      <div>

                        <p className="text-slate-500 dark:text-slate-300">
                          Payment
                        </p>

                        <h3 className="font-bold dark:text-white">
                          {order.paymentMethod}
                        </h3>

                      </div>

                      {/* TOTAL */}
                      <div>

                        <p className="text-slate-500 dark:text-slate-300">
                          Total
                        </p>

                        <h3 className="font-bold text-blue-600">
                          ₹
                          {order.totalPrice}
                        </h3>

                      </div>

                      {/* STATUS */}
                      <div>

                        <p className="text-slate-500 dark:text-slate-300">
                          Status
                        </p>

                        <h3
                          className={`font-bold

                            ${
                              order.orderStatus ===
                              "Delivered"

                                ? "text-green-500"

                                : order.orderStatus ===
                                  "Shipped"

                                ? "text-purple-500"

                                : order.orderStatus ===
                                  "Processing"

                                ? "text-yellow-500"

                                : "text-blue-500"
                            }
                          `}
                        >

                          {order.orderStatus}

                        </h3>

                      </div>

                    </div>

                  </div>

                  {/* TRACKING INFO */}
                  <div className="px-6 pt-5 space-y-2">

                    <p className="dark:text-white">

                      <span className="font-semibold">
                        Tracking Number:
                      </span>
                      {" "}

                      {
                        order.trackingNumber ||
                        "N/A"
                      }

                    </p>

                    <p className="dark:text-white">

                      <span className="font-semibold">
                        Courier Service:
                      </span>
                      {" "}

                      {
                        order.courierService ||
                        "N/A"
                      }

                    </p>

                  </div>

                  {/* TRACKING TIMELINE */}
<div className="px-6 py-6">

  <div className="flex items-center justify-between relative">

    {/* LINE */}
    <div className="absolute top-5 left-0 w-full h-1 bg-slate-300 dark:bg-slate-700 z-0"></div>

    {/* PROCESSING */}
    <div className="relative z-10 flex flex-col items-center">

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white

        ${
          order.orderStatus === "Processing" ||
          order.orderStatus === "Shipped" ||
          order.orderStatus === "Delivered"

            ? "bg-blue-600"

            : "bg-slate-400"
        }
      `}
      >

        1

      </div>

      <p className="mt-3 text-sm font-semibold dark:text-white">

        Processing

      </p>

    </div>

    {/* SHIPPED */}
    <div className="relative z-10 flex flex-col items-center">

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white

        ${
          order.orderStatus === "Shipped" ||
          order.orderStatus === "Delivered"

            ? "bg-purple-600"

            : "bg-slate-400"
        }
      `}
      >

        2

      </div>

      <p className="mt-3 text-sm font-semibold dark:text-white">

        Shipped

      </p>

    </div>

    {/* DELIVERED */}
    <div className="relative z-10 flex flex-col items-center">

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white

        ${
          order.orderStatus === "Delivered"

            ? "bg-green-600"

            : "bg-slate-400"
        }
      `}
      >

        3

      </div>

      <p className="mt-3 text-sm font-semibold dark:text-white">

        Delivered

      </p>

    </div>

  </div>

</div>

                  {/* PRODUCTS */}
                  <div className="p-6 space-y-5">

                    {order.orderItems.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="flex flex-col md:flex-row gap-5 border-b border-slate-200 dark:border-slate-700 pb-5"
                        >

                          {/* IMAGE */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full md:w-32 h-32 object-cover rounded-2xl"
                          />

                          {/* CONTENT */}
                          <div className="flex-1">

                            <h2 className="text-2xl font-bold dark:text-white">
                              {item.name}
                            </h2>

                            <p className="text-slate-500 dark:text-slate-300 mt-2">
                              Quantity:
                              {" "}
                              {item.qty}
                            </p>

                            <h3 className="text-3xl font-bold text-blue-600 mt-4">
                              ₹
                              {item.price}
                            </h3>

                          </div>

                        </div>
                      )
                    )}

                    {/* DOWNLOAD BUTTON */}
                    <button
                      onClick={() =>
                        downloadInvoice(
                          order
                        )
                      }
                      className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
                    >

                      Download Invoice

                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </section>
  );
};

export default MyOrders;