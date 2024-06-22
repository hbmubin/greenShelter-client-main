import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import AllProperties from "../Pages/AllProperties";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import PropertyDetails from "../Pages/PropertyDetails";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../Dashboard/UserProfile";
import UserWishlist from "../Dashboard/UserWishlist";
import UserBought from "../Dashboard/UserBought";
import UserReviews from "../Dashboard/UserReviews";
import ErrorPage from "../Pages/ErrorPage";
import OfferForm from "../Dashboard/OfferForm";
import AgentProfile from "../Dashboard/AgentProfile";
import AgentAddedProperty from "../Dashboard/AgentAddedProperty";
import AgentSoldProperty from "../Dashboard/AgentSoldProperty";
import AgentRequestProperty from "../Dashboard/AgentRequestProperty";
import AgentAddProperty from "../Dashboard/AgentAddProperty";
import AgentRoute from "./AgentRoite";
import AgentUpdateProperty from "../Dashboard/AgentUpdateProperty";
import Payment from "../Dashboard/Payment/Payment";
import AdminProfile from "../Dashboard/AdminProfile";
import AdminProperties from "../Dashboard/AdminProperties";
import AdminUsers from "../Dashboard/AdminUsers";
import AdminReviews from "../Dashboard/AdminReviews";
import AdminRoute from "./AdminRoute";
import AdminAdvertise from "../Dashboard/AdminAdvertise";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-properties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://green-shelter-server-a-12.vercel.app/property/${params.id}`
          ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "user-wishlist",
        element: (
          <PrivateRoute>
            <UserWishlist></UserWishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "user-bought",
        element: (
          <PrivateRoute>
            <UserBought></UserBought>
          </PrivateRoute>
        ),
      },
      {
        path: "user-reviews",
        element: (
          <PrivateRoute>
            <UserReviews></UserReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "make-offer/:id",
        element: (
          <PrivateRoute>
            <OfferForm></OfferForm>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://green-shelter-server-a-12.vercel.app/property/${params.id}`
          ),
      },
      {
        path: "agent-profile",
        element: (
          <AgentRoute>
            <AgentProfile></AgentProfile>
          </AgentRoute>
        ),
      },
      {
        path: "agent-addProperty",
        element: (
          <AgentRoute>
            <AgentAddProperty></AgentAddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "agent-addedProperty",
        element: (
          <AgentRoute>
            <AgentAddedProperty></AgentAddedProperty>
          </AgentRoute>
        ),
      },
      {
        path: "agent-soldProperty",
        element: (
          <AgentRoute>
            <AgentSoldProperty></AgentSoldProperty>
          </AgentRoute>
        ),
      },
      {
        path: "agent-requestedProperty",
        element: (
          <AgentRoute>
            <AgentRequestProperty></AgentRequestProperty>
          </AgentRoute>
        ),
      },
      {
        path: "update-property/:id",
        element: (
          <AgentRoute>
            <AgentUpdateProperty></AgentUpdateProperty>
          </AgentRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://green-shelter-server-a-12.vercel.app/property/${params.id}`
          ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "admin-properties",
        element: (
          <AdminRoute>
            <AdminProperties></AdminProperties>
          </AdminRoute>
        ),
      },
      {
        path: "admin-users",
        element: (
          <AdminRoute>
            <AdminUsers></AdminUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin-reviews",
        element: (
          <AdminRoute>
            <AdminReviews></AdminReviews>
          </AdminRoute>
        ),
      },
      {
        path: "admin-advertise",
        element: (
          <AdminRoute>
            <AdminAdvertise></AdminAdvertise>
          </AdminRoute>
        ),
      },
    ],
  },
]);
