const categories = [
  "Electronics",
  "Fashion",
  "Shoes",
  "Gaming",
  "AI Gadgets",
  "Accessories",
];

const Categories = () => {
  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-4xl font-bold mb-10 text-center">
          Shop By Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center font-semibold cursor-pointer hover:-translate-y-2"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;