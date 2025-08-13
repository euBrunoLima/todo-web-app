import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"; 

function PublicRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se já tiver token, manda pra /tasks
  if (token) {
    return <Navigate to="/tasks" replace />;
  }

  return children;
}

export default PublicRoute;
