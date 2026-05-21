import {
  useContext,
} from "react";

import WishlistContext from "../context/WishlistContextObject";

const useWishlist = () => {

  return useContext(
    WishlistContext
  );
};

export default useWishlist;