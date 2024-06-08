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
        element: <PropertyDetails></PropertyDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/property/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "user-wishlist",
        element: <UserWishlist></UserWishlist>,
      },
      {
        path: "user-bought",
        element: <UserBought></UserBought>,
      },
      {
        path: "user-reviews",
        element: <UserReviews></UserReviews>,
      },
    ],
  },
]);
