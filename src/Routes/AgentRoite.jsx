import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useRole from "../Hooks/useRole";

const AgentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading) {
    return (
      <div className=" min-h-screen flex justify-center items-start">
        <span className="loading mt-24 px-16 loading-ring loading-lg"></span>
      </div>
    );
  }
  if (user && role == "agent") {
    return children;
  }
  {
    return <Navigate state={location.pathname} to="/"></Navigate>;
  }
};

export default AgentRoute;
