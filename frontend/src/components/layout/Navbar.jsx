import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          AI Smart Commerce
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-10">
          
          {/* Menu */}
          <div className="hidden md:flex items-center gap-8 text-xl font-medium">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/login">Login</Link>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-3xl text-slate-700"
          >
            <FaShoppingCart />

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;