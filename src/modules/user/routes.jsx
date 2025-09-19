import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute.jsx'
import UserLayout from './ui/Layout.jsx'
import Profile from './ui/Profile.jsx'
import Orders from './ui/Orders.jsx'
import Wishlist from './ui/Wishlist.jsx'
import Payments from './ui/Payments.jsx'
import Support from './ui/Support.jsx'

export default [
  <Route
    key="user"
    path="/user/*"
    element={
      <ProtectedRoute allow={['user']}>
        <UserLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Profile />} />
    <Route path="orders" element={<Orders />} />
    <Route path="wishlist" element={<Wishlist />} />
    <Route path="payments" element={<Payments />} />
    <Route path="support" element={<Support />} />
  </Route>
]
