import {
  useEffect,
  useState,
} from "react";

import CartContext from "./CartContextObject";

const CartProvider = ({
  children,
}) => {

  // LOAD DIRECTLY
  const [cartItems,
    setCartItems] =
    useState(() => {

      const storedCart =
        localStorage.getItem(
          "cartItems"
        );

      return storedCart
        ? JSON.parse(
            storedCart
          )
        : [];
    });

  // SAVE CART
  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        cartItems
      )
    );

  }, [cartItems]);

  // ADD TO CART
  const addToCart =
    (product) => {

      const existing =
        cartItems.find(
          (item) =>
            item._id ===
            product._id
        );

      // EXISTS
      if (existing) {

        const updatedCart =
          cartItems.map(
            (item) =>
              item._id ===
              product._id
                ? {
                    ...item,
                    qty:
                      item.qty + 1,
                  }
                : item
          );

        setCartItems(
          updatedCart
        );

      } else {

        // NEW PRODUCT
        setCartItems([
          ...cartItems,
          {
            ...product,
            qty: 1,
          },
        ]);
      }
    };

  // DECREASE QTY
  const decreaseQty =
    (id) => {

      const existing =
        cartItems.find(
          (item) =>
            item._id === id
        );

      // REMOVE IF 1
      if (
        existing.qty === 1
      ) {

        const filtered =
          cartItems.filter(
            (item) =>
              item._id !== id
          );

        setCartItems(
          filtered
        );

      } else {

        const updated =
          cartItems.map(
            (item) =>
              item._id === id
                ? {
                    ...item,
                    qty:
                      item.qty - 1,
                  }
                : item
          );

        setCartItems(
          updated
        );
      }
    };

  // REMOVE PRODUCT
  const removeFromCart =
    (id) => {

      const updated =
        cartItems.filter(
          (item) =>
            item._id !== id
        );

      setCartItems(
        updated
      );
    };

  // CLEAR CART
  const clearCart =
    () => {

      setCartItems([]);
    };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;