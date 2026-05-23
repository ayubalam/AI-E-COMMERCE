import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

} from "recharts";

const AdminDashboard = () => {

  const [stats,
    setStats] =
    useState(null);

  const [recentOrders,
    setRecentOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const { data } =
            await axios.get(
              "http://localhost:5000/api/admin/stats",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setStats(
            data.stats
          );

          setRecentOrders(
            data.recentOrders
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed To Load Dashboard"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchStats();

  }, []);

  // CHART DATA
  const chartData = [

    {
      name: "Users",
      value: stats?.users || 0,
    },

    {
      name: "Products",
      value: stats?.products || 0,
    },

    {
      name: "Orders",
      value: stats?.orders || 0,
    },

    {
      name: "Revenue",
      value: stats?.revenue || 0,
    },
  ];

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold dark:text-white">

        Loading...

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold dark:text-white">

            Admin Dashboard

          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">

            AI Ecommerce Analytics

          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* USERS */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl">

            <h2 className="text-slate-500 dark:text-slate-300 text-lg">

              Total Users

            </h2>

            <h1 className="text-5xl font-bold text-blue-600 mt-4">

              {stats?.users}

            </h1>

          </div>

          {/* PRODUCTS */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl">

            <h2 className="text-slate-500 dark:text-slate-300 text-lg">

              Total Products

            </h2>

            <h1 className="text-5xl font-bold text-green-600 mt-4">

              {stats?.products}

            </h1>

          </div>

          {/* ORDERS */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl">

            <h2 className="text-slate-500 dark:text-slate-300 text-lg">

              Total Orders

            </h2>

            <h1 className="text-5xl font-bold text-purple-600 mt-4">

              {stats?.orders}

            </h1>

          </div>

          {/* REVENUE */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl">

            <h2 className="text-slate-500 dark:text-slate-300 text-lg">

              Revenue

            </h2>

            <h1 className="text-4xl font-bold text-red-600 mt-4">

              ₹{stats?.revenue}

            </h1>

          </div>
        </div>

        {/* ANALYTICS CHART */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 mb-10">

          <h2 className="text-3xl font-bold dark:text-white mb-8">

            Analytics Overview

          </h2>

          <div className="w-full h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={chartData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold dark:text-white">

              Recent Orders

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b dark:border-slate-700">

                  <th className="text-left py-4 dark:text-white">
                    Customer
                  </th>

                  <th className="text-left py-4 dark:text-white">
                    Amount
                  </th>

                  <th className="text-left py-4 dark:text-white">
                    Payment
                  </th>

                  <th className="text-left py-4 dark:text-white">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentOrders.map(
                  (order) => (

                    <tr
                      key={order._id}
                      className="border-b dark:border-slate-700"
                    >

                      <td className="py-4 dark:text-white">

                        {order?.shippingInfo?.name}

                      </td>

                      <td className="py-4 dark:text-white">

                        ₹{order.totalPrice}

                      </td>

                      <td className="py-4 dark:text-white">

                        {order.paymentMethod}

                      </td>

                      <td className="py-4">

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                          {order.orderStatus}

                        </span>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;