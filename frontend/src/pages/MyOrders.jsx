import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

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

                      <div>

                        <p className="text-slate-500 dark:text-slate-300">
                          Payment
                        </p>

                        <h3 className="font-bold dark:text-white">
                          {order.paymentMethod}
                        </h3>

                      </div>

                      <div>

                        <p className="text-slate-500 dark:text-slate-300">
                          Total
                        </p>

                        <h3 className="font-bold text-blue-600">
                          $
                          {order.totalPrice}
                        </h3>

                      </div>

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
                              $
                              {item.price}
                            </h3>

                          </div>

                        </div>
                      )
                    )}

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