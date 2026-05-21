import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";

import WishlistProvider from "./context/WishlistContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <WishlistProvider>

        <Toaster position="top-right" />

        <App />

      </WishlistProvider>

    </BrowserRouter>

  </React.StrictMode>
);