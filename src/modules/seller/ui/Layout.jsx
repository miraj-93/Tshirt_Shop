import { Outlet } from 'react-router-dom'
import Layout from '../../common/Layout.jsx'

const items = [
  { label: 'Dashboard', to: '/seller' },
  { label: 'Products', to: '/seller/products' },
  { label: 'Orders', to: '/seller/orders' },
  { label: 'Earnings', to: '/seller/earnings' },
  { label: 'Reviews', to: '/seller/reviews' },
  { label: 'Support', to: '/seller/support' },
]

export default function SellerLayout() {
  return (
    <Layout sidebarItems={items} title="Seller">
      <Outlet />
    </Layout>
  )
}
