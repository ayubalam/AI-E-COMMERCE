import {
  Link,
} from "react-router-dom";

const Success = () => {

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 text-center max-w-xl w-full">

        <h1 className="text-5xl font-bold text-green-500">

          Payment Successful 🎉

        </h1>

        <p className="text-slate-500 dark:text-slate-300 mt-5 text-lg">

          Thank you for your order.

        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
        >

          Continue Shopping

        </Link>

      </div>

    </section>
  );
};

export default Success;