import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import RoomDetail from "../components/Rooms/RoomDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "room-details",
        element: <RoomDetail />,
      },
    ],
  },
]);

export default router;
