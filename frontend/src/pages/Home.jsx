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

const Home = () => {

  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

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

        } finally {

          setLoading(false);
        }
      };

    fetchProducts();

  }, []);

  // FEATURED PRODUCTS
  const featuredProducts =
    products.slice(0, 3);

  // LATEST PRODUCTS
  const latestProducts =
    [...products]
      .reverse()
      .slice(0, 6);

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
    <section className="bg-slate-100 dark:bg-slate-900 min-h-screen">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-28 px-4">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-6xl font-black leading-tight">

            AI Smart Commerce

          </h1>

          <p className="text-2xl mt-6 text-slate-200 max-w-3xl mx-auto">

            Experience the future of AI-powered ecommerce shopping.

          </p>

          <Link
            to="/products"
            className="inline-block mt-10 bg-white text-blue-600 hover:bg-slate-200 px-10 py-5 rounded-2xl font-bold text-xl transition duration-300"
          >

            Explore Products

          </Link>

        </div>

      </div>

      {/* FEATURED */}
      <div className="max-w-7xl mx-auto px-4 py-20">

        <div className="mb-12">

          <h2 className="text-5xl font-bold dark:text-white">

            Featured Products

          </h2>

          <p className="text-slate-500 dark:text-slate-300 mt-4 text-lg">

            Top AI-selected products for you

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {featuredProducts.map(
            (product) => (

              <div
                key={product._id}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">

                    {product.category}

                  </span>

                  <h2 className="text-3xl font-bold dark:text-white mt-5">

                    {product.name}

                  </h2>

                  <p className="text-slate-500 dark:text-slate-300 mt-4 line-clamp-2">

                    {product.description}

                  </p>

                  <div className="flex items-center justify-between mt-8">

                    <h3 className="text-4xl font-bold text-blue-600">

                      ${product.price}

                    </h3>

                    <Link
                      to={`/products/${product._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold"
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

      {/* LATEST PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 pb-20">

        <div className="mb-12">

          <h2 className="text-5xl font-bold dark:text-white">

            Latest Products

          </h2>

          <p className="text-slate-500 dark:text-slate-300 mt-4 text-lg">

            Newly added AI ecommerce products

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {latestProducts.map(
            (product) => (

              <div
                key={product._id}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <span className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold">

                    {product.category}

                  </span>

                  <h2 className="text-3xl font-bold dark:text-white mt-5">

                    {product.name}

                  </h2>

                  <p className="text-slate-500 dark:text-slate-300 mt-4 line-clamp-2">

                    {product.description}

                  </p>

                  <div className="flex items-center justify-between mt-8">

                    <h3 className="text-4xl font-bold text-blue-600">

                      ${product.price}

                    </h3>

                    <Link
                      to={`/products/${product._id}`}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold"
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

export default Home;