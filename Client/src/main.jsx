import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-tooltip/dist/react-tooltip.css";
import "swiper/css";
import { HelmetProvider } from "react-helmet-async";
import AuthProviders from "./Providers/AuthProviders.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProviders>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProviders>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
