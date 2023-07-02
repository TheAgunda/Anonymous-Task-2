import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth ? <Outlet />
            : auth?.accessToken ? <Navigate to="/login" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}
export default RequireAuth;
