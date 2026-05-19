const categories = [
  "All",
  "Electronics",
  "Gaming",
  "Fashion",
  "Shoes",
  "AI Gadgets",
];

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      
      <h2 className="text-2xl font-bold mb-6">
        Categories
      </h2>

      <div className="flex flex-col gap-4">
        
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`text-left px-4 py-3 rounded-xl transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;