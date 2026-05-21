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