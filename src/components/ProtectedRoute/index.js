import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  let loginId = Cookies.get("loginId");

  return loginId === undefined ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
