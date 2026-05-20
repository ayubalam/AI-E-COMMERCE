import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

import useAuth from "../hooks/useAuth";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  // Handle Input
  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await API.post(
            "/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          data.token
        );

        login(data.user);

        toast.success(
          "Login Successful 🚀"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Login Failed"
        );
      }
    };

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-6">

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 max-w-lg w-full">

        <h1 className="text-4xl font-bold text-center text-slate-800 dark:text-white">
          Welcome Back
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-10 space-y-6"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="w-full bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="w-full bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-500 dark:text-slate-300 mt-8">

          Don't have account?

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;