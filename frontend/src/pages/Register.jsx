import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-16">
      
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        
        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-slate-500 text-center mt-3">
          Join AI Smart Commerce today
        </p>

        <form className="mt-8 flex flex-col gap-5">
          
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-slate-300 px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="border border-slate-300 px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Create password"
            className="border border-slate-300 px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-slate-500">
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