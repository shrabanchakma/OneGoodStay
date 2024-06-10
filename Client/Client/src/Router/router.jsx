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
import AllUsersListings from "../components/Dashboard/Admin/AllRooms/AllUsersListings";
import HostRoute from "../UserRoutes/HostRoute";
import AdminRoute from "../UserRoutes/AdminRoute";
import UpdateContactInfo from "../components/Dashboard/Common/UpdateContactInfo";
import UpdateProfile from "../components/Dashboard/Common/UpdateProfile";
import PrivateRoute from "../UserRoutes/PrivateRoute";
import Checkout from "../Pages/Checkout/Checkout";

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
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
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
  {
    path: "/checkout/room/:id",
    element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
    loader: async ({ params }) => await getRoomData(params?.id),
  },
  {
    path: "profile/update/basic-information",
    element: <UpdateProfile />,
  },
  {
    path: "profile/update/contact-information",
    element: <UpdateContactInfo />,
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
        element: (
          <HostRoute>
            <AddRoom />
          </HostRoute>
        ),
      },
      {
        path: "hosted-rooms",
        element: (
          <HostRoute>
            <HostedRoomsListings />
          </HostRoute>
        ),
      },
      {
        path: "hosted-rooms/update/:id",
        element: (
          <HostRoute>
            <UpdateRoom />
          </HostRoute>
        ),
        loader: async ({ params }) => await getRoomData(params?.id),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsersListings />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
