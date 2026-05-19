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

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    login({
      email: formData.email,
    });

    toast.success("Login successful");

    navigate("/");
  };

  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-16">
      
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        
        <h1 className="text-4xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-slate-500 text-center mt-3">
          Login to continue shopping
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >
          
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="border border-slate-300 px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="border border-slate-300 px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-slate-500">
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