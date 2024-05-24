import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import AddFood from "../Pages/AddFood/AddFood";
import PrivateRoute from "./PrivateRoute";
import AvailableFoods from "../Pages/AvailableFoods/AvailableFoods";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import MyAddedFoods from "../Pages/MyAddedFoods/MyAddedFoods";
import UpdateMyFood from "../Pages/UpdateMyFood/UpdateMyFood";
import MyRequestedFoods from "../Pages/MyRequestedFoods/MyRequestedFoods";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
         {
            path: "/",
            element: <Home></Home>,
         },
         {
            path: "/login",
            element: <Login></Login>,
         },
         {
            path: "/registration",
            element: <Registration></Registration>,
         },
         {
            path: "/add-food",
            element: (
               <PrivateRoute>
                  <AddFood></AddFood>
               </PrivateRoute>
            ),
         },
         {
            path: "/available-foods",
            element: <AvailableFoods></AvailableFoods>,
         },
         {
            path: "/food-details/:id",
            element: (
               <PrivateRoute>
                  <FoodDetails></FoodDetails>
               </PrivateRoute>
            ),
         },

         {
            path: "/my-added-foods",
            element: (
               <PrivateRoute>
                  <MyAddedFoods></MyAddedFoods>
               </PrivateRoute>
            ),
         },
         {
            path: "/my-requested-foods",
            element: (
               <PrivateRoute>
                  <MyRequestedFoods></MyRequestedFoods>
               </PrivateRoute>
            ),
         },

         {
            path: "/updateFood/:id",
            element: <UpdateMyFood></UpdateMyFood>,
         },
      ],
   },
]);
