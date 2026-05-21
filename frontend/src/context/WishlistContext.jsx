import {
  useEffect,
  useState,
} from "react";

import WishlistContext from "./WishlistContextObject";

const WishlistProvider = ({
  children,
}) => {

  const [wishlistItems,
    setWishlistItems] =
    useState([]);

  // LOAD WISHLIST
  useEffect(() => {

    const storedWishlist =
      localStorage.getItem(
        "wishlistItems"
      );

    if (storedWishlist) {

      const parsedWishlist =
        JSON.parse(
          storedWishlist
        );

      // FIX REACT WARNING
      setTimeout(() => {

        setWishlistItems(
          parsedWishlist
        );

      }, 0);
    }

  }, []);

  // SAVE WISHLIST
  useEffect(() => {

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(
        wishlistItems
      )
    );

  }, [wishlistItems]);

  // ADD TO WISHLIST
  const addToWishlist =
    (product) => {

      const exists =
        wishlistItems.find(
          (item) =>
            item._id ===
            product._id
        );

      if (exists) return;

      setWishlistItems([
        ...wishlistItems,
        product,
      ]);
    };

  // REMOVE FROM WISHLIST
  const removeFromWishlist =
    (id) => {

      const updatedWishlist =
        wishlistItems.filter(
          (item) =>
            item._id !== id
        );

      setWishlistItems(
        updatedWishlist
      );
    };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;