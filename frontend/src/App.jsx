import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import CartProvider from "./context/CartContext";

import AuthProvider from "./context/AuthProvider";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>

          <Toaster position="top-right" />

          <AppRoutes />

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;