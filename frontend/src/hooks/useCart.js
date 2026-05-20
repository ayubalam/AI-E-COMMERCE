import { useContext } from "react";

import CartContext from "../context/CartContextObject";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;