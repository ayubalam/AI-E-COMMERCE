import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Dashboard from "../pages/Dashboard";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";


import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {

  return (
    <MainLayout>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
        

        <Route
          path="/products"
          element={<Products />}
        />
           <Route
                 path="/wishlist"
             element={<Wishlist />}
            />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
             <Route
                path="/checkout"
                  element={<Checkout />}
         />

         <Route
             path="/success"
             element={<Success />}
             />
             <Route
           path="/wishlist"
              element={<Wishlist />}
            />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </MainLayout>
  );
};

export default AppRoutes;