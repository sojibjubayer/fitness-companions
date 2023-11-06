import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Services from "../pages/services/Services";
import MyServices from "../pages/private/MyServices";
import MySChedules from "../pages/private/MySChedules";
import AddServices from "../pages/private/AddServices";
import PrivateRoutes from "./PrivateRoutes";
import ServiceDetails from "../pages/details/ServiceDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<NotFound></NotFound>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
               
            },
            {
                path:'/services',
                element:<Services></Services>
            },
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/My Services',
                element:<PrivateRoutes><MyServices></MyServices></PrivateRoutes>
            },
            {
                path:'/My Schedules',
                element:<PrivateRoutes><MySChedules></MySChedules></PrivateRoutes>
            },
            {
                path:'/Add Services',
                element:<PrivateRoutes><AddServices></AddServices></PrivateRoutes>
            },
            {
                path:'/services/:id',
                element:<PrivateRoutes><ServiceDetails></ServiceDetails></PrivateRoutes>,
                loader: () => fetch('http://localhost:5000/services')
            },
            
            
        ]

    },
]);
export default router;