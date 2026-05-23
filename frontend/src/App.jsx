import AppRoutes from "./routes/AppRoutes";

import CartProvider from "./context/CartContext";

import AuthProvider from "./context/AuthContext";

import WishlistProvider from "./context/WishlistContext";

import ThemeProvider from "./context/ThemeContext";

import ChatBot from "./components/ChatBot";

const App = () => {

  return (

    <ThemeProvider>

      <AuthProvider>

        <CartProvider>

          <WishlistProvider>

            <div className="relative">

              <AppRoutes />

              <ChatBot />

            </div>

          </WishlistProvider>

        </CartProvider>

      </AuthProvider>

    </ThemeProvider>
  );
};

export default App;