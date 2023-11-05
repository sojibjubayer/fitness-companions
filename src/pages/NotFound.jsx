import { NavLink } from "react-router-dom";


const NotFound = () => {
    return (
        <div>
            <p>404 :: page not found</p>
            <NavLink to='/'>goto  Home</NavLink>
        </div>
    );
};

export default NotFound;