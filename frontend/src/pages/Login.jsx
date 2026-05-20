import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {

    e.preventDefault();

    // Validation
    if (
      !formData.email ||
      !formData.password
    ) {
      return toast.error("All fields required");
    }

    // Fake Login
    login({
      email: formData.email,
    });

    toast.success("Login Successful");

    navigate("/dashboard");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* Email */}
          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
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

        {/* Register Link */}
        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}

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