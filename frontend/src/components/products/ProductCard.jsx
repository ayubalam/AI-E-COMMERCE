const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2">
      
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">{product.name}</h3>

        <p className="text-slate-500 mt-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-5">
          
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;