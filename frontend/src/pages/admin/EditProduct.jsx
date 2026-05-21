import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getSingleProduct,
  updateProduct,
} from "../../services/productService";

const EditProduct = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "token"
    );

  const [loading,
    setLoading] =
    useState(true);

  const [formData,
    setFormData] =
    useState({
      name: "",
      price: "",
      category: "",
      image: "",
      stock: "",
      description: "",
    });

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const data =
            await getSingleProduct(
              id
            );

          setFormData({
            name:
              data.name || "",
            price:
              data.price || "",
            category:
              data.category || "",
            image:
              data.image || "",
            stock:
              data.stock || "",
            description:
              data.description || "",
          });

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load product"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchProduct();

  }, [id]);

  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateProduct(
          id,
          formData,
          token
        );

        toast.success(
          "Product Updated"
        );

        navigate(
          "/admin/products"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Update Failed"
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

      <div className="max-w-3xl mx-auto">

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-10">

          {/* HEADING */}
          <div className="mb-10">

            <h1 className="text-5xl font-bold dark:text-white">
              Edit Product
            </h1>

            <p className="text-slate-500 dark:text-slate-300 mt-3">
              Update product information
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* PRICE */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* CATEGORY */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* IMAGE */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* STOCK */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block font-semibold mb-2 dark:text-white">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition duration-300"
            >

              Update Product

            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;