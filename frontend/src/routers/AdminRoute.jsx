import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin" />;
  }
  return children ? children : <Outlet />;
};
AdminRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminRoute;
