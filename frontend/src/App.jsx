import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import CartProvider from "./context/CartContext";

import AuthProvider from "./context/AuthProvider";

import WishlistProvider from "./context/WishlistContext";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>

      <AuthProvider>

        <CartProvider>

          <WishlistProvider>

            <Toaster position="top-right" />

            <AppRoutes />

          </WishlistProvider>

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>
  );
};

export default App;