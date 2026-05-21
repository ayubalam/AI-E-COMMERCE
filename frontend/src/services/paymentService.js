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