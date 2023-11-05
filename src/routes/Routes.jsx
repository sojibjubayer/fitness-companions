import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Services from "../pages/services/Services";

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
            
            
        ]

    },
]);
export default router;