import { useState } from "react";

import ProductCard from "../components/products/ProductCard";

import SearchBar from "../components/products/SearchBar";

import FilterSidebar from "../components/products/FilterSidebar";

import productsData from "../data/products";

const Products = () => {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  // Filter Products
  const filteredProducts =
    productsData.filter((product) => {

      // Search Match
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      // Category Match
      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <section className="bg-slate-100 dark:bg-slate-950 min-h-screen py-16 transition duration-300">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold text-slate-800 dark:text-white">
            Explore Products
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-4 text-lg">
            Discover smart AI-powered shopping products.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div>

            <FilterSidebar
              selectedCategory={
                selectedCategory
              }
              setSelectedCategory={
                setSelectedCategory
              }
            />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">

            {filteredProducts.length ===
            0 ? (

              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-10 text-center text-2xl font-semibold text-slate-500 dark:text-slate-300 transition duration-300">
                No Products Found
              </div>

            ) : (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredProducts.map(
                  (product) => (

                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;