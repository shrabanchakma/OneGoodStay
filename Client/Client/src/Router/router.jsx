import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import RoomDetails from "../components/Rooms/RoomDetails";
import ErrorPage from "../Pages/ErrorPage";
import Signup from "../Pages/Signup/Signup";
import SignIn from "../Pages/SignIn/SignIn";
import DashboardLayout from "../Layout/DashboardLayout";
import MyBookings from "../components/Dashboard/Guest/MyBookings";
import Profile from "../components/Dashboard/Common/Profile";
import AddRoom from "../components/Dashboard/Host/AddRoom/AddRoom";
import { getRoomData } from "../Api/rooms";
import HostedRoomsListings from "../components/Dashboard/Host/HostedRooms/HostedRoomsListings";
import UpdateRoom from "../components/Dashboard/Host/UpdateRoom/UpdateRoom";
// import UpdateRoom from "../components/Dashboard/Host/UpdateRoom/UpdateRoom";
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
        path: "room-details/:id",
        element: <RoomDetails />,
        loader: async ({ params }) => await getRoomData(params?.id),
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "add-rooms",
        element: <AddRoom />,
      },
      {
        path: "hosted-rooms",
        element: <HostedRoomsListings />,
      },
      {
        path: "hosted-rooms/update/:id",
        element: <UpdateRoom />,
        loader: async ({ params }) => await getRoomData(params?.id),
      },
    ],
  },
]);

export default router;
