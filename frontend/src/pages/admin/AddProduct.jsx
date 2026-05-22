import {
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

const AddProduct = () => {

  const [formData,
    setFormData] =
    useState({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      stock: "",
    });

  const [uploading,
    setUploading] =
    useState(false);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // IMAGE UPLOAD
  const uploadImage =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        setUploading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const imageData =
          new FormData();

        imageData.append(
          "image",
          file
        );

        const { data } =
          await axios.post(
            "http://localhost:5000/api/products/upload",
            imageData,
            {
              headers: {

                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setFormData({
          ...formData,
          image:
            data.image,
        });

        toast.success(
          "Image Uploaded"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Image Upload Failed"
        );

      } finally {

        setUploading(false);
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          "http://localhost:5000/api/products",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Product Added"
        );

        setFormData({
          name: "",
          price: "",
          category: "",
          image: "",
          description: "",
          stock: "",
        });

      } catch (error) {

        toast.error(
          error?.response?.data
            ?.message ||
            "Add Product Failed"
        );
      }
    };

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 px-4 py-10">

      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <h1 className="text-5xl font-bold dark:text-white">
            Add Product
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            Create new AI product
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* NAME */}
          <div>

            <label className="block mb-2 font-semibold dark:text-white">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* PRICE */}
          <div>

            <label className="block mb-2 font-semibold dark:text-white">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>

            <label className="block mb-2 font-semibold dark:text-white">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* IMAGE */}
          <div>

            <label className="block mb-2 font-semibold dark:text-white">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-3 outline-none"
              required
            />

            {uploading && (

              <p className="text-blue-600 mt-2">

                Uploading Image...

              </p>
            )}

            {formData.image && (

              <img
                src={formData.image}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-2xl mt-4"
              />
            )}

          </div>

          {/* STOCK */}
          <div>

            <label className="block mb-2 font-semibold dark:text-white">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block mb-2 font-semibold dark:text-white">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;