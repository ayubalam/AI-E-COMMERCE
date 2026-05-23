import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import {
  FaCheckCircle,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";

const Success = () => {

  const navigate =
    useNavigate();

  // AUTO REDIRECT
  useEffect(() => {

    const timer =
      setTimeout(() => {

        navigate(
          "/my-orders"
        );

      }, 5000);

    return () =>
      clearTimeout(
        timer
      );

  }, [navigate]);

  return (

    <section className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl p-10 text-center max-w-2xl w-full relative overflow-hidden">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-8">

          <div className="bg-green-100 p-8 rounded-full animate-bounce">

            <FaCheckCircle className="text-7xl text-green-500" />

          </div>

        </div>

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-green-500">

          Payment Successful 🎉

        </h1>

        {/* DESCRIPTION */}
        <p className="text-slate-500 dark:text-slate-300 mt-6 text-xl leading-relaxed">

          Your payment has been processed successfully.
          <br />

          Thank you for shopping with AI Smart Commerce.

        </p>

        {/* ORDER STATUS */}
        <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-6 mt-10">

          <div className="flex items-center justify-center gap-4">

            <FaShoppingBag className="text-3xl text-blue-600" />

            <div className="text-left">

              <h3 className="text-xl font-bold dark:text-white">

                Order Confirmed

              </h3>

              <p className="text-slate-500 dark:text-slate-400">

                Your order is now being processed.

              </p>

            </div>

          </div>

        </div>

        {/* REDIRECT INFO */}
        <p className="mt-6 text-slate-500 dark:text-slate-400">

          Redirecting to My Orders in 5 seconds...

        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-5 mt-10">

          {/* MY ORDERS */}
          <Link
            to="/my-orders"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition duration-300"
          >

            My Orders

            <FaArrowRight />

          </Link>

          {/* CONTINUE SHOPPING */}
          <Link
            to="/products"
            className="bg-slate-200 dark:bg-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 px-8 py-4 rounded-2xl font-bold transition duration-300"
          >

            Continue Shopping

          </Link>

        </div>

      </div>

    </section>
  );
};

export default Success;