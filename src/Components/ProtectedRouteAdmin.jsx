import { Navigate } from "react-router"; // ✅ use react-router-dom
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRouteAdmin({ children }) {
  const { user, role, loading } = useAuth(); // ✅ use role from context

  if (loading) return <p>Loading...</p>; 
  if (!user) return <Navigate to="/login" />; // not logged in
  if (role !== "admin") return <Navigate to="/" />; // logged in but not admin

  return children;
}
