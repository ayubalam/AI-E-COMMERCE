import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";

import Products from "../pages/Products";

import ProductDetails from "../pages/ProductDetails";

import Cart from "../pages/Cart";

import Wishlist from "../pages/Wishlist";

import Dashboard from "../pages/Dashboard";

import Login from "../pages/Login";

import Register from "../pages/Register";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {

  return (

    <MainLayout>

      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetails />
          }
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected */}
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