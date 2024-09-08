import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import AvailableFoods from "../Pages/AvailableFoods/AvailableFoods";
import AddFood from "../Pages/AddFood/AddFood";
import Error from "../Pages/Error/Error";
import MyFood from "../Pages/MyFood/MyFood";
import MyFoodRequest from "../Pages/MyFoodRequest/MyFoodRequest";
import PrivateRoute from "./PrivateRoute";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
// import UpdateFoodModal from "../Pages/MyFood/UpdateFoodModal";
// import UpdateFoodModal from "../Pages/MyFood/UpdateFoodModal";
import UpdateFood from "../Pages/MyFood/UpdateFood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/availableFood",
        element: <AvailableFoods />,
        loader: () => fetch("http://localhost:5000/food"),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/food/${params.id}`),
      },

      {
        path: "/myFood",
        element: (
          <PrivateRoute>
            <MyFood />
          </PrivateRoute>
        ),
      },

      {
        path: "/foodRequest",
        element: (
          <PrivateRoute>
            <MyFoodRequest />
          </PrivateRoute>
        ),
        // loader: () => fetch("http://localhost:5000/request"),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/request?email=${params.email}`),
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateFood",
        element: <UpdateFood />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
