import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { CartProvider } from "./context/CartContext.jsx";

import AuthProvider from "./context/AuthContext";

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