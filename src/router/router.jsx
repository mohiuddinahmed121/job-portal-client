import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/Signin/Signin";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h2>Route not found</h2>,
      children: [
         {
            path: "/",
            element: <Home></Home>,
         },
         {
            path: "/register",
            element: <Register></Register>,
         },
         {
            path: "/signin",
            element: <SignIn></SignIn>,
         },
         {
            path: "/jobs/:id",
            element: (
               <PrivateRoute>
                  <JobDetails></JobDetails>
               </PrivateRoute>
            ),
            loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`),
         },
         {
            path: "/jobapply/:id",
            element: (
               <PrivateRoute>
                  <JobApply></JobApply>
               </PrivateRoute>
            ),
         },
         {
            path: "/myApplications",
            element: (
               <PrivateRoute>
                  <MyApplications></MyApplications>
               </PrivateRoute>
            ),
         },
      ],
   },
]);

export default router;
