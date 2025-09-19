import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './modules/auth/Login.jsx'
import Unauthorized from './modules/common/Unauthorized.jsx'
import NotFound from './modules/common/NotFound.jsx'
import SuperAdminRoutes from './modules/superadmin/routes.jsx'
import AdminRoutes from './modules/admin/routes.jsx'
import SellerRoutes from './modules/seller/routes.jsx'
import UserRoutes from './modules/user/routes.jsx'
import { useAuth } from './modules/auth/AuthContext.jsx'

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? `/${user.role}` : "/login"} />} />
      <Route path="/login" element={<Login />} />
      {SuperAdminRoutes}
      {AdminRoutes}
      {SellerRoutes}
      {UserRoutes}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
