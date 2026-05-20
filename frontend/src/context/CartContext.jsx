import { useEffect, useState } from "react";
import CartContext from "./CartContextObject";

const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {

    const savedCart =
      localStorage.getItem("cartItems");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // Save Cart
  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // Add To Cart
  const addToCart = (product) => {

    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase Quantity
  const increaseQuantity = (id) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {

    setCartItems(
      cartItems.filter(
        (item) => item.id !== id
      )
    );
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;