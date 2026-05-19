import { useParams } from "react-router-dom";
import products from "../data/products";
import useCart from "../hooks/useCart";

const ProductDetails = () => {

  const { id } = useParams();

  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  // Product Not Found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        
        <h1 className="text-5xl font-bold text-red-500">
          Product Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 py-16">
      
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-12 p-8 lg:p-12">
          
          {/* Product Image */}
          <div className="flex items-center justify-center">
            
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-lg rounded-3xl object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            
            {/* Category */}
            <p className="text-blue-600 font-semibold text-lg uppercase tracking-wide">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-bold mt-4 text-slate-800">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-slate-500 mt-6 leading-relaxed text-lg">
              Experience premium AI-powered ecommerce products with
              modern design, high performance, and next-generation
              technology built for smart shopping experiences.
            </p>

            {/* Price */}
            <div className="mt-8">
              
              <span className="text-4xl font-bold text-slate-900">
                ${product.price}
              </span>
            </div>

            {/* Features */}
            <div className="mt-8 space-y-3 text-slate-600">
              
              <p>✅ Premium Quality Product</p>

              <p>✅ Fast Delivery Available</p>

              <p>✅ AI Recommended Product</p>

              <p>✅ Secure Checkout</p>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">
              
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"
              >
                Add To Cart
              </button>

              <button className="border border-slate-300 hover:bg-slate-100 px-8 py-4 rounded-2xl text-lg font-semibold transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;