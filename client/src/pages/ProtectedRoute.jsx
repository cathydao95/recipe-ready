import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

// If user is not authetnicated, navigate them to main page
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
