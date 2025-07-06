import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";


const ProtectedRoute = ({ children }) => {

  const { isLoggedIn } = useAuth();
  const location = useLocation();

  
  if (!isLoggedIn) {
    // Redirect to login, preserve where user wanted to go
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};


export default ProtectedRoute;