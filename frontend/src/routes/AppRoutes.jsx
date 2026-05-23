import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";

import Products from "../pages/Products";

import ProductDetails from "../pages/ProductDetails";

import Cart from "../pages/Cart";

import Wishlist from "../pages/Wishlist";

import UserDashboard from "../pages/user/UserDashboard";

import Login from "../pages/Login";

import Register from "../pages/Register";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import AddProduct from "../pages/admin/AddProduct";

import AdminProducts from "../pages/admin/AdminProducts";

import EditProduct from "../pages/admin/EditProduct";

import Checkout from "../pages/Checkout";

import MyOrders from "../pages/MyOrders";

import AdminOrders from "../pages/admin/AdminOrders";

import AdminDashboard from "../pages/admin/AdminDashboard";

import Success from "../pages/Success";

import Profile from "../pages/Profile";

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
        <Route
            path="/admin/add-product"
            element={
           <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
         }
        />
             <Route
          path="/checkout"
          element={
          <ProtectedRoute>
             <Checkout />
           </ProtectedRoute>
                 }
        />

        <Route
             path="/success"
               element={<Success />}
           />
        <Route
          path="/admin/edit-product/:id"
        element={
         <ProtectedRoute>
           <EditProduct />
          </ProtectedRoute>
          }
         />

        <Route
               path="/admin/products"
               element={
               <ProtectedRoute>
                  <AdminProducts />
                  </ProtectedRoute>
               }
           />
            <Route
                  path="/my-orders"
                 element={
                <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
                }
          />

          <Route
              path="/admin/orders"
              element={
              <ProtectedRoute>
               <AdminOrders />
            </ProtectedRoute>
            }
         />

           <Route
             path="/admin/dashboard"
             element={
                <ProtectedRoute>
                    <AdminDashboard />
                    </ProtectedRoute>
                 }
               />
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      </Routes>

    </MainLayout>
  );
};

export default AppRoutes;