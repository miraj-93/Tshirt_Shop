import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute.jsx'
import SellerLayout from './ui/Layout.jsx'
import Dashboard from './ui/Dashboard.jsx'
import Products from './ui/Products.jsx'
import Orders from './ui/Orders.jsx'
import Earnings from './ui/Earnings.jsx'
import Reviews from './ui/Reviews.jsx'
import Support from './ui/Support.jsx'

export default [
  <Route
    key="seller"
    path="/seller/*"
    element={
      <ProtectedRoute allow={['seller']}>
        <SellerLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
    <Route path="earnings" element={<Earnings />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="support" element={<Support />} />
  </Route>
]
