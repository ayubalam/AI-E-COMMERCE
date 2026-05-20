import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

const Register = () => {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
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
            "/auth/register",
            formData
          );

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        toast.success(
          "Registration Successful 🚀"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-6">

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 max-w-lg w-full">

        <h1 className="text-4xl font-bold text-center text-slate-800 dark:text-white">
          Create Account
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-10 space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="w-full bg-slate-100 dark:bg-slate-700 dark:text-white p-4 rounded-2xl outline-none"
          />

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
            Register
          </button>
        </form>

        <p className="text-center text-slate-500 dark:text-slate-300 mt-8">

          Already have account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;