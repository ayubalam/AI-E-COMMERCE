import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const Dashboard = () => {

  const { user } = useAuth();

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 py-16 px-6">

      <div className="max-w-5xl mx-auto">

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

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">

            <h3 className="text-slate-500 dark:text-slate-400 text-lg">
              Orders
            </h3>

            <p className="text-4xl font-bold mt-4 text-slate-800 dark:text-white">
              0
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">

            <h3 className="text-slate-500 dark:text-slate-400 text-lg">
              Wishlist
            </h3>

            <p className="text-4xl font-bold mt-4 text-slate-800 dark:text-white">
              0
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">

            <h3 className="text-slate-500 dark:text-slate-400 text-lg">
              Cart Items
            </h3>

            <p className="text-4xl font-bold mt-4 text-slate-800 dark:text-white">
              0
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;