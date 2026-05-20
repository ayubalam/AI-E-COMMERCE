import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await login(formData);

        toast.success(
          "Login Successful"
        );

        navigate("/dashboard");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-6">

      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-center text-slate-800 dark:text-white mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Email */}
          <div>

            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div>

            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 dark:text-slate-300">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;