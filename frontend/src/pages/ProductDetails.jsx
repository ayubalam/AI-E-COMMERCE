import { useParams } from "react-router-dom";
import products from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-4xl font-bold">
        Product Not Found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 py-16">
      
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-14 bg-white p-10 rounded-3xl shadow-lg">
          
          {/* Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            
            <p className="text-blue-600 font-semibold text-lg">
              {product.category}
            </p>

            <h1 className="text-5xl font-bold mt-4">
              {product.name}
            </h1>

            <p className="text-slate-500 mt-6 leading-relaxed text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, voluptatibus. AI-powered premium ecommerce product.
            </p>

            <div className="mt-8">
              
              <span className="text-4xl font-bold text-slate-800">
                ${product.price}
              </span>
            </div>

            <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;