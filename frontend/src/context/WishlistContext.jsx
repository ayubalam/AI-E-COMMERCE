import { useEffect, useState } from "react";

import WishlistContext from "./WishlistContextObject";

const WishlistProvider = ({ children }) => {

  const [wishlistItems, setWishlistItems] =
    useState(() => {

      const savedWishlist =
        localStorage.getItem("wishlistItems");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    });

  // Save Wishlist
  useEffect(() => {

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);

  // Add Wishlist
  const addToWishlist = (product) => {

    const existingItem =
      wishlistItems.find(
        (item) => item.id === product.id
      );

    if (!existingItem) {

      setWishlistItems([
        ...wishlistItems,
        product,
      ]);
    }
  };

  // Remove Wishlist
  const removeFromWishlist = (id) => {

    setWishlistItems(
      wishlistItems.filter(
        (item) => item.id !== id
      )
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