import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { CartProvider } from "./context/CartContext.jsx"; 

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        <AppRoutes />

      </CartProvider>
    </BrowserRouter>
  );
};

export default App;