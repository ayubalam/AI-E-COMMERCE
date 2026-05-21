import axios from "axios";

const API =
  "http://localhost:5000/api/products";

// GET ALL PRODUCTS
export const getProducts =
  async () => {

    const { data } =
      await axios.get(API);

    return data.products;
  };

// GET SINGLE PRODUCT
export const getSingleProduct =
  async (id) => {

    const { data } =
      await axios.get(
        `${API}/${id}`
      );

    return data.product;
  };

// CREATE PRODUCT
export const createProduct =
  async (
    productData,
    token
  ) => {

    const { data } =
      await axios.post(
        API,
        productData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data.product;
  };

// UPDATE PRODUCT
export const updateProduct =
  async (
    id,
    productData,
    token
  ) => {

    const { data } =
      await axios.put(
        `${API}/${id}`,
        productData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data.product;
  };

// DELETE PRODUCT
export const deleteProduct =
  async (
    id,
    token
  ) => {

    const { data } =
      await axios.delete(
        `${API}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };