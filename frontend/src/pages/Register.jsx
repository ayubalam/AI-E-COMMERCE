import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error("All fields required");
    }

    toast.success("Registration Successful");

    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* Name */}
          <div>
            <label className="font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

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
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;  