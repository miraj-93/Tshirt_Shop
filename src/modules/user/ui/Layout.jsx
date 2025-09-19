import { Outlet } from 'react-router-dom'
import Layout from '../../common/Layout.jsx'

const items = [
  { label: 'My Profile', to: '/user' },
  { label: 'My Orders', to: '/user/orders' },
  { label: 'Wishlist', to: '/user/wishlist' },
  { label: 'Payments', to: '/user/payments' },
  { label: 'Support', to: '/user/support' },
]

export default function UserLayout() {
  return (
    <Layout sidebarItems={items} title="My Account">
      <Outlet />
    </Layout>
  )
}
