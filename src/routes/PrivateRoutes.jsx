import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import PropTypes from 'prop-types';




const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading)
        return <span className="loading loading-spinner loading-lg"></span>
    if (user&&!loading)
        return children;
    else
        return <Navigate to='/login'></Navigate>

};
PrivateRoutes.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoutes;