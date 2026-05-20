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
export const getProduct =
  async (id) => {

    const { data } =
      await axios.get(
        `${API}/${id}`
      );

    return data.product;
  };