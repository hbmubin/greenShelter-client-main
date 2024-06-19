import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return (
      <div className=" min-h-screen flex justify-center items-start">
        <span className="loading mt-24 px-16 loading-ring loading-lg"></span>
      </div>
    );
  }
  if (user && role == "admin") {
    return children;
  }
  {
    return <Navigate state={location.pathname} to="/"></Navigate>;
  }
};

export default AdminRoute;
