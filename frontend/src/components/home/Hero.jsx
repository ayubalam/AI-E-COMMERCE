import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white flex items-center">
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Smart Shopping <br />
            Powered By AI
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Discover the future of ecommerce with AI-powered
            recommendations, smart search, and personalized shopping
            experiences.
          </p>

          <div className="mt-8 flex gap-5">
            <button className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition duration-300">
              Shop Now
            </button>

            <button className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-black transition duration-300">
              Explore
            </button>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="hero"
            className="rounded-3xl shadow-2xl w-full max-w-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;