import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import RoomDetails from "../components/Rooms/RoomDetails";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "room-details",
        element: <RoomDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
