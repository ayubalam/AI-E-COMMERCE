import axios from "axios";

const API =
  "http://localhost:5000/api/orders";

// CREATE ORDER
export const createOrder =
  async (
    orderData,
    token
  ) => {

    const { data } =
      await axios.post(
        API,
        orderData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data.order;
  };

// GET MY ORDERS
export const getMyOrders =
  async (token) => {

    const { data } =
      await axios.get(
        `${API}/my-orders`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data.orders;
  };

// ADMIN GET ALL ORDERS
export const getAllOrders =
  async (token) => {

    const { data } =
      await axios.get(
        `${API}/admin`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data.orders;
  };

// MARK DELIVERED
export const markDelivered =
  async (
    id,
    token
  ) => {

    const { data } =
      await axios.put(
        `${API}/${id}/deliver`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };