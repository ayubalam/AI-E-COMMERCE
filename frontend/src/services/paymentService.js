import axios from "axios";

const API =
  "http://localhost:5000/api/payments";

// CREATE ORDER
export const checkoutPayment =
  async (amount) => {

    try {

      const { data } =
        await axios.post(
          `${API}/create-order`,
          {
            amount:
              Number(amount),
          }
        );

      return data;

    } catch (error) {

      console.log(
        "PAYMENT ERROR ❌"
      );

      console.log(error);

      throw error;
    }
  };

// VERIFY PAYMENT
export const verifyPayment =
  async (paymentData) => {

    try {

      const { data } =
        await axios.post(
          `${API}/verify-payment`,
          paymentData
        );

      return data;

    } catch (error) {

      console.log(
        "VERIFY ERROR ❌"
      );

      console.log(error);

      throw error;
    }
  };