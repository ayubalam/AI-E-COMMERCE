import { useContext } from "react";

import CartContextObject from "../context/CartContextObject";

const useCart = () => {

  return useContext(
    CartContextObject
  );
};

export default useCart;