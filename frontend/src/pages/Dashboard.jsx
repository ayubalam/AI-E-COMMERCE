import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaBox,
  FaUsers,
  FaDollarSign,
  FaShoppingBag,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import useAuth from "../hooks/useAuth";

const Dashboard = () => {

  const { user } =
    useAuth();

  // STATS
  const [stats,
    setStats] =
    useState({

      totalOrders: 0,

      totalUsers: 0,

      totalProducts: 0,

      totalRevenue: 0,
    });

  // CHART DATA
  const salesData = [

    {
      name: "Jan",
      sales: 4000,
    },

    {
      name: "Feb",
      sales: 3000,
    },

    {
      name: "Mar",
      sales: 5000,
    },

    {
      name: "Apr",
      sales: 7000,
    },

    {
      name: "May",
      sales: 6000,
    },
  ];

  // FETCH STATS
  useEffect(() => {

    // ONLY ADMIN
    if (
      user?.role !==
      "admin"
    ) {
      return;
    }

    const fetchStats =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await fetch(
              "http://localhost:5000/api/admin/stats",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          setStats(data);

        } catch (error) {

          console.log(error);
        }
      };

    fetchStats();

  }, [user]);

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 py-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-slate-800 dark:text-white">
            Dashboard
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
            Welcome back to AI Smart Commerce
          </p>

        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10">

          <div className="flex flex-col md:flex-row md:items-center gap-8">

            {/* Avatar */}
            <div className="flex justify-center">

              <div className="bg-blue-100 dark:bg-slate-700 p-8 rounded-full">

                <FaUserCircle className="text-8xl text-blue-600 dark:text-white" />

              </div>

            </div>

            {/* Info */}
            <div className="space-y-5 flex-1">

              {/* Name */}
              <div className="flex items-center gap-4">

                <FaUserCircle className="text-blue-600 text-2xl" />

                <div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Full Name
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {user?.name}
                  </h2>

                </div>

              </div>

              {/* Email */}
              <div className="flex items-center gap-4">

                <FaEnvelope className="text-blue-600 text-2xl" />

                <div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Email Address
                  </p>

                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {user?.email}
                  </h2>

                </div>

              </div>

              {/* Role */}
              <div className="flex items-center gap-4">

                <FaShieldAlt className="text-blue-600 text-2xl" />

                <div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Account Role
                  </p>

                  <h2 className="text-xl font-semibold capitalize text-slate-800 dark:text-white">
                    {user?.role}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ADMIN ANALYTICS */}
        {user?.role ===
          "admin" && (

          <>

            {/* ANALYTICS */}
            <div className="grid md:grid-cols-4 gap-8 mt-12">

              {/* ORDERS */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-slate-500 dark:text-slate-400 text-lg">
                      Orders
                    </h3>

                    <p className="text-4xl font-bold mt-4 text-slate-800 dark:text-white">
                      {stats.totalOrders}
                    </p>

                  </div>

                  <FaShoppingBag className="text-5xl text-blue-600" />

                </div>

              </div>

              {/* USERS */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-slate-500 dark:text-slate-400 text-lg">
                      Users
                    </h3>

                    <p className="text-4xl font-bold mt-4 text-slate-800 dark:text-white">
                      {stats.totalUsers}
                    </p>

                  </div>

                  <FaUsers className="text-5xl text-green-600" />

                </div>

              </div>

              {/* PRODUCTS */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-slate-500 dark:text-slate-400 text-lg">
                      Products
                    </h3>

                    <p className="text-4xl font-bold mt-4 text-slate-800 dark:text-white">
                      {stats.totalProducts}
                    </p>

                  </div>

                  <FaBox className="text-5xl text-purple-600" />

                </div>

              </div>

              {/* REVENUE */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-slate-500 dark:text-slate-400 text-lg">
                      Revenue
                    </h3>

                    <p className="text-4xl font-bold mt-4 text-slate-800 dark:text-white">
                      ₹{stats.totalRevenue}
                    </p>

                  </div>

                  <FaDollarSign className="text-5xl text-yellow-500" />

                </div>

              </div>

            </div>

            {/* SALES CHART */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 mt-12">

              <h2 className="text-3xl font-bold mb-8 dark:text-white">
                Monthly Sales
              </h2>

              <ResponsiveContainer
                width="100%"
                height={400}
              >

                <BarChart
                  data={salesData}
                >

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="sales"
                    fill="#2563eb"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </>
        )}

      </div>

    </section>
  );
};

export default Dashboard;