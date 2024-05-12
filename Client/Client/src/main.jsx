import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "swiper/css";
import { HelmetProvider } from "react-helmet-async";
import AuthProviders from "./Providers/AuthProviders.jsx";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProviders>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProviders>
    </HelmetProvider>
  </React.StrictMode>
);
