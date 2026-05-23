import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaSearch,
  FaFilter,
} from "react-icons/fa";

import {
  getProducts,
} from "../services/productService";

import useAuth
  from "../hooks/useAuth";

import ProductCard
  from "../components/products/ProductCard";

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

  const [sort,
    setSort] =
    useState("");

  const [minPrice,
    setMinPrice] =
    useState("");

  const [maxPrice,
    setMaxPrice] =
    useState("");

  const {
    user,
  } = useAuth();

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
    products
      .filter(
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

          // PRICE
          const matchesPrice =

            (minPrice === "" ||
              product.price >=
                Number(minPrice)) &&

            (maxPrice === "" ||
              product.price <=
                Number(maxPrice));

          return (

            matchesSearch &&

            matchesCategory &&

            matchesPrice
          );
        }
      )
      .sort((a, b) => {

        if (
          sort === "low-high"
        ) {

          return (
            a.price -
            b.price
          );
        }

        if (
          sort === "high-low"
        ) {

          return (
            b.price -
            a.price
          );
        }

        if (
          sort === "latest"
        ) {

          return (
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            )
          );
        }

        return 0;
      });

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

    <section className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-5xl font-bold dark:text-white">

              Products

            </h1>

            <p className="text-slate-500 dark:text-slate-300 mt-3 text-lg">

              Explore our latest AI products

            </p>

          </div>

          {/* FILTER ICON */}
          <div className="flex items-center gap-3 text-blue-600">

            <FaFilter className="text-3xl" />

            <span className="font-bold text-lg">

              Smart Filters

            </span>

          </div>

        </div>

        {/* FILTERS */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 mb-12">

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">

            {/* SEARCH */}
            <div className="relative">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-2xl pl-14 pr-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

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

              <option value="All">

                All Categories

              </option>

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

            {/* MIN PRICE */}
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(
                  e.target.value
                )
              }
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* MAX PRICE */}
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value
                )
              }
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">

                Sort Products

              </option>

              <option value="low-high">

                Price Low → High

              </option>

              <option value="high-low">

                Price High → Low

              </option>

              <option value="latest">

                Latest Products

              </option>

            </select>

          </div>

        </div>

        {/* TOTAL PRODUCTS */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-bold dark:text-white">

            {filteredProducts.length} Products Found

          </h2>

        </div>

        {/* NO PRODUCTS */}
        {filteredProducts.length === 0 ? (

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-16 text-center">

            <h2 className="text-4xl font-bold dark:text-white mb-4">

              No Products Found

            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-lg">

              Try changing your filters or search keyword.

            </p>

          </div>

        ) : (

          /* PRODUCTS GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {filteredProducts.map(
              (product) => (

                <div
                  key={product._id}
                  className="relative"
                >

                  {/* PRODUCT CARD */}
                  <ProductCard
                    product={product}
                  />

                  {/* ADMIN EDIT */}
                  {user?.role === "admin" && (

                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition duration-300"
                    >

                      Edit

                    </Link>
                  )}

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