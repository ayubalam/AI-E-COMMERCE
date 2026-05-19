import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2">
      
      <Link to={`/products/${product.id}`}>
        
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
      </Link>

      <div className="p-5">
        
        <p className="text-sm text-blue-600 font-medium">
          {product.category}
        </p>

        <h3 className="text-2xl font-bold mt-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-6">
          
          <span className="text-2xl font-bold text-slate-800">
            ${product.price}
          </span>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;