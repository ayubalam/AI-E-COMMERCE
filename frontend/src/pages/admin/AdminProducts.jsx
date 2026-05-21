import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

const AdminProducts = () => {

  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const token =
    localStorage.getItem(
      "token"
    );

  // FETCH PRODUCTS
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

  // LOAD PRODUCTS
 useEffect(() => {

  let mounted = true;

  const loadProducts =
    async () => {

      try {

        const data =
          await getProducts();

        if (mounted) {

          setTimeout(() => {

            setProducts(data);

            setLoading(false);

          }, 0);
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load products"
        );

        if (mounted) {

          setLoading(false);
        }
      }
    };

  loadProducts();

  return () => {

    mounted = false;
  };

}, []);

  // DELETE PRODUCT
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteProduct(
          id,
          token
        );

        toast.success(
          "Product Deleted"
        );

        fetchProducts();

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete Failed"
        );
      }
    };

  // LOADING
  if (loading) {

    return (
      <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center">

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-bold dark:text-white">
              Admin Products
            </h1>

            <p className="text-slate-500 dark:text-slate-300 mt-3">
              Manage all ecommerce products
            </p>
          </div>

          {/* ADD BUTTON */}
          <Link
            to="/admin/add-product"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
          >

            <FaPlus />

            Add Product

          </Link>
        </div>

        {/* EMPTY */}
        {products.length === 0 ? (

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 text-center">

            <h2 className="text-3xl font-bold dark:text-white">
              No Products Found
            </h2>

            <p className="text-slate-500 mt-3">
              Add your first product
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map(
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

                    {/* STOCK */}
                    <p className="text-slate-500 dark:text-slate-300 mt-3">

                      Stock:
                      {" "}
                      <span className="font-bold">
                        {product.stock}
                      </span>

                    </p>

                    {/* ACTIONS */}
                    <div className="flex gap-4 mt-8">

                      {/* EDIT */}
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition duration-300"
                      >

                        <FaEdit />

                        Edit

                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition duration-300"
                      >

                        <FaTrash />

                        Delete

                      </button>

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

export default AdminProducts;