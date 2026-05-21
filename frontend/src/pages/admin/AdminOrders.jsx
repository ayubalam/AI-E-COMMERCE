import {
  useEffect,
  useState,
  useCallback,
} from "react";

import toast from "react-hot-toast";

import {
  getAllOrders,
  markDelivered,
} from "../../services/orderService";

const AdminOrders = () => {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const token =
    localStorage.getItem(
      "token"
    );

  // FETCH
  const fetchOrders =
    useCallback(
      async () => {

        try {

          const data =
            await getAllOrders(
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
      },
      [token]
    );

  // LOAD ORDERS
  useEffect(() => {

    const loadOrders =
      async () => {

        await fetchOrders();
      };

    loadOrders();

  }, [fetchOrders]);

  // DELIVER
  const handleDeliver =
    async (id) => {

      try {

        await markDelivered(
          id,
          token
        );

        toast.success(
          "Order Delivered"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        toast.error(
          "Update Failed"
        );
      }
    };

  // UPDATE STATUS
  const handleStatusUpdate =
    async (
      id,
      status,
      trackingNumber,
      courierService
    ) => {

      try {

        await fetch(
          `http://localhost:5000/api/orders/${id}/status`,
          {
            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({

              status,

              trackingNumber,

              courierService,
            }),
          }
        );

        toast.success(
          "Status Updated"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        toast.error(
          "Update Failed"
        );
      }
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
            Admin Orders
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            Manage customer orders
          </p>

        </div>

        <div className="space-y-8">

          {orders.map(
            (order) => (

              <div
                key={order._id}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden"
              >

                {/* HEADER */}
                <div className="bg-slate-200 dark:bg-slate-700 px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>

                    <h2 className="text-2xl font-bold dark:text-white">
                      {order.user?.name}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-300">
                      {order.user?.email}
                    </p>

                  </div>

                  <div className="flex gap-6 flex-wrap">

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
                        ${order.totalPrice}
                      </h3>

                    </div>

                    {/* STATUS */}
                    <div>

                      <p className="text-slate-500 dark:text-slate-300">
                        Status
                      </p>

                      <select
                        value={
                          order.orderStatus
                        }

                        onChange={(e) =>
                          handleStatusUpdate(
                            order._id,
                            e.target.value,
                            order.trackingNumber,
                            order.courierService
                          )
                        }

                        className="border border-slate-300 rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white"
                      >

                        <option>
                          Paid
                        </option>

                        <option>
                          Processing
                        </option>

                        <option>
                          Shipped
                        </option>

                        <option>
                          Delivered
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

                {/* ADMIN INPUTS */}
                <div className="px-6 pt-5 flex flex-col md:flex-row gap-4">

                  <input
                    type="text"
                    placeholder="Tracking Number"
                    defaultValue={
                      order.trackingNumber
                    }
                    className="border rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white"
                    onBlur={(e) =>
                      handleStatusUpdate(
                        order._id,
                        order.orderStatus,
                        e.target.value,
                        order.courierService
                      )
                    }
                  />

                  <input
                    type="text"
                    placeholder="Courier Service"
                    defaultValue={
                      order.courierService
                    }
                    className="border rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white"
                    onBlur={(e) =>
                      handleStatusUpdate(
                        order._id,
                        order.orderStatus,
                        order.trackingNumber,
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* PRODUCTS */}
                <div className="p-6 space-y-5">

                  {order.orderItems.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex flex-col md:flex-row gap-5 border-b border-slate-200 dark:border-slate-700 pb-5"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full md:w-32 h-32 object-cover rounded-2xl"
                        />

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
                            ${item.price}
                          </h3>

                        </div>

                      </div>
                    )
                  )}

                  {/* BUTTON */}
                  {!order.isDelivered && (

                    <button
                      onClick={() =>
                        handleDeliver(
                          order._id
                        )
                      }
                      className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold"
                    >

                      Mark Delivered

                    </button>
                  )}

                </div>

              </div>
            )
          )}

        </div>

      </div>
    </section>
  );
};

export default AdminOrders;