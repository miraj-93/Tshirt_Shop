import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute.jsx'
import AdminLayout from './ui/Layout.jsx'
import Overview from './ui/Overview.jsx'
import Users from './ui/Users.jsx'
import Products from './ui/Products.jsx'
import Orders from './ui/Orders.jsx'
import Reports from './ui/Reports.jsx'
import Content from './ui/Content.jsx'

export default [
  <Route
    key="admin"
    path="/admin/*"
    element={
      <ProtectedRoute allow={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Overview />} />
    <Route path="users" element={<Users />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
    <Route path="reports" element={<Reports />} />
    <Route path="content" element={<Content />} />
  </Route>
]
