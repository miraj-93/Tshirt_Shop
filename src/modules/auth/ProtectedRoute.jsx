import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

export default function ProtectedRoute({ children, allow = [] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (allow.length && !allow.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }
  return children
}
