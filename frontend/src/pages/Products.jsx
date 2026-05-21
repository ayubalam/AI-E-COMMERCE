import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getProducts,
} from "../services/productService";

const Products = () => {

  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [category,
    setCategory] =
    useState("All");

  // FETCH PRODUCTS
  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const data =
            await getProducts();

          setProducts(data);

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load products"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchProducts();

  }, []);

  // FILTERED PRODUCTS
  const filteredProducts =
    products.filter(
      (product) => {

        // SEARCH
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        // CATEGORY
        const matchesCategory =
          category === "All"
            ? true
            : product.category ===
              category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  // LOADING
  if (loading) {

    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">

        <h1 className="text-4xl font-bold dark:text-white">
          Loading...
        </h1>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold dark:text-white">
            Products
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            Explore our latest AI products
          </p>

        </div>

        {/* SEARCH + FILTER */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          
          {/* CATEGORY */}
<select
  value={category}
  onChange={(e) =>
    setCategory(
      e.target.value
    )
  }
  className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
>

  {/* ALL */}
  <option value="All">
    All
  </option>

  {/* DYNAMIC CATEGORIES */}
  {[
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ].map(
    (cat, index) => (

      <option
        key={index}
        value={cat}
      >
        {cat}
      </option>
    )
  )}

</select>

        </div>

        {/* NO PRODUCTS */}
        {filteredProducts.length === 0 ? (

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 text-center">

            <h2 className="text-3xl font-bold dark:text-white">
              No Products Found
            </h2>

          </div>

        ) : (

          /* PRODUCTS GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProducts.map(
              (product) => (

                <div
                  key={product._id}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300"
                >

                  {/* IMAGE */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-6">

                    {/* CATEGORY */}
                    <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

                      {product.category}

                    </span>

                    {/* NAME */}
                    <h2 className="text-3xl font-bold dark:text-white mt-5">

                      {product.name}

                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-slate-500 dark:text-slate-300 mt-4 line-clamp-2">

                      {product.description}

                    </p>

                    {/* PRICE */}
                    <h3 className="text-4xl font-bold text-blue-600 mt-6">

                      ${product.price}

                    </h3>

                    {/* BUTTONS */}
                    <div className="flex gap-4 mt-6">

                      {/* VIEW */}
                      <Link
                        to={`/products/${product._id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-center font-semibold transition duration-300"
                      >

                        View

                      </Link>

                      {/* EDIT */}
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-2xl text-center font-semibold transition duration-300"
                      >

                        Edit

                      </Link>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </section>
  );
};

export default Products;