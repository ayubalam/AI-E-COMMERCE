import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

const Register = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData,
    setFormData] =
    useState({
      name: "",
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

        const { data } =
          await axios.post(
            "http://localhost:5000/api/auth/register",
            formData
          );

        // Context Login
        login(data);

        toast.success(
          "Registration Successful"
        );

        navigate("/dashboard");

      } catch (error) {

        toast.error(
          error?.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4 py-10">

      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl p-8 md:p-10">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Register
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-2">
            Create your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>

            <label className="block font-medium mb-2 dark:text-white">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>

            <label className="block font-medium mb-2 dark:text-white">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>

            <label className="block font-medium mb-2 dark:text-white">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-500 dark:text-slate-300 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;