import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-16">
      
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        
        <h1 className="text-4xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-slate-500 text-center mt-3">
          Login to continue shopping
        </p>

        <form className="mt-8 flex flex-col gap-5">
          
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-slate-300 px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
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