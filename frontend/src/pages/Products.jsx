import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

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

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const data =
            await getProducts();

          setProducts(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchProducts();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Products
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-2">
            Explore our latest AI products
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map(
            (product) => (

              <div
                key={product._id}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
              >

                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />

                {/* Content */}
                <div className="p-5">

                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  <h2 className="text-xl font-bold mt-4 dark:text-white">
                    {product.name}
                  </h2>

                  <p className="text-slate-500 dark:text-slate-300 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-5">

                    <h3 className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </h3>

                    <Link
                      to={`/products/${product._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                    >
                      View
                    </Link>
                  </div>

                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;