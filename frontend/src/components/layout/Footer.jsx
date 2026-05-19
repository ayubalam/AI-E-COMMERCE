const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-14 mt-20">
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-blue-500">
            AI Smart Commerce
          </h2>

          <p className="mt-4 text-slate-300 leading-relaxed">
            Modern AI-powered ecommerce platform with smart
            recommendations and seamless shopping experience.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-slate-300">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold mb-5">
            Contact
          </h3>

          <p className="text-slate-300">
            support@aismartcommerce.com
          </p>

          <p className="text-slate-300 mt-2">
            +91 9876543210
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-slate-400">
        © 2026 AI Smart Commerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;