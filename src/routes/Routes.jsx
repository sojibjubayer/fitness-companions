import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Services from "../pages/services/Services";
import MySChedules from "../pages/private/MySChedules";
import AddServices from "../pages/private/AddServices";
import PrivateRoutes from "./PrivateRoutes";
import ServiceDetails from "../pages/details/ServiceDetails";
import ManageServices from "../pages/private/ManageServices";
import UpdateService from "../pages/private/UpdateService";

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
                path:'/Manage Services',
                element:<PrivateRoutes><ManageServices></ManageServices></PrivateRoutes>,
                loader: () => fetch('http://localhost:5000/services')

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
            {
                path:'/updateService/:id',
                element:<UpdateService></UpdateService>,
                loader:({params})=>fetch(`http://localhost:5000/services/${params.id}`)            
            },
           
            
            
        ]

    },
]);
export default router;