import { useState } from "react";

import ProductCard from "../components/products/ProductCard";
import SearchBar from "../components/products/SearchBar";
import FilterSidebar from "../components/products/FilterSidebar";

import productsData from "../data/products";

const Products = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredProducts = productsData.filter((product) => {
    
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-slate-100 min-h-screen py-16">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="mb-12">
          
          <h1 className="text-5xl font-bold">
            Explore Products
          </h1>

          <p className="text-slate-500 mt-4 text-lg">
            Discover smart AI-powered shopping products.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-10">
          
          {/* Sidebar */}
          <div>
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Products */}
          <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;