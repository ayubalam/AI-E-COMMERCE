import { FaUserCircle } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const Dashboard = () => {

  const { user, logout } = useAuth();

  return (
    <section className="min-h-screen bg-slate-100 py-14 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-slate-800">
            User Dashboard
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Welcome back to AI Smart Commerce
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left */}
          <div className="flex items-center gap-6">

            <FaUserCircle className="text-8xl text-blue-600" />

            <div>

              <h2 className="text-3xl font-bold text-slate-800">
                {user?.email}
              </h2>

              <p className="text-slate-500 mt-2">
                Premium Ecommerce User
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-2xl font-semibold transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {/* Orders */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h3 className="text-2xl font-bold text-slate-800">
              Orders
            </h3>

            <p className="text-slate-500 mt-4">
              Track all your orders and purchases.
            </p>
          </div>

          {/* Wishlist */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h3 className="text-2xl font-bold text-slate-800">
              Wishlist
            </h3>

            <p className="text-slate-500 mt-4">
              Save your favorite AI products.
            </p>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h3 className="text-2xl font-bold text-slate-800">
              Settings
            </h3>

            <p className="text-slate-500 mt-4">
              Manage account settings and security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;