import axios from "axios";

const API =
  "http://localhost:5000/api/payments";

// CREATE ORDER
export const checkoutPayment =
  async (amount) => {

    const { data } =
      await axios.post(
        `${API}/create-order`,
        {
          amount,
        }
      );

    return data;
  };

// VERIFY PAYMENT
export const verifyPayment =
  async (paymentData) => {

    const { data } =
      await axios.post(
        `${API}/verify-payment`,
        paymentData
      );

    return data;
  };