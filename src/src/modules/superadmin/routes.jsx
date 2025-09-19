import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute.jsx'
import SuperAdminLayout from './ui/Layout.jsx'
import Overview from './ui/Overview.jsx'
import Users from './ui/Users.jsx'
import Sellers from './ui/Sellers.jsx'
import Products from './ui/Products.jsx'
import Orders from './ui/Orders.jsx'
import Settings from './ui/Settings.jsx'

export default [
  <Route
    key="superadmin"
    path="/superadmin/*"
    element={
      <ProtectedRoute allow={['superadmin']}>
        <SuperAdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Overview />} />
    <Route path="users" element={<Users />} />
    <Route path="sellers" element={<Sellers />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
    <Route path="settings" element={<Settings />} />
  </Route>
]
