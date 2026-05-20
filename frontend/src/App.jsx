import AppRoutes from "./routes/AppRoutes";

import CartProvider from "./context/CartContext";

import AuthProvider from "./context/AuthContext";

import WishlistProvider from "./context/WishlistContext";

import ThemeProvider from "./context/ThemeContext";

const App = () => {

  return (

    <ThemeProvider>

      <AuthProvider>

        <CartProvider>

          <WishlistProvider>

            <AppRoutes />

          </WishlistProvider>

        </CartProvider>

      </AuthProvider>

    </ThemeProvider>
  );
};

export default App;