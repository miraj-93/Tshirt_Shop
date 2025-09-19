import { Outlet } from 'react-router-dom'
import Layout from '../../common/Layout.jsx'

const items = [
  { label: 'Dashboard', to: '/superadmin' },
  { label: 'Users', to: '/superadmin/users' },
  { label: 'Sellers', to: '/superadmin/sellers' },
  { label: 'Products', to: '/superadmin/products' },
  { label: 'Orders', to: '/superadmin/orders' },
  { label: 'Settings', to: '/superadmin/settings' },
]

export default function SuperAdminLayout() {
  return (
    <Layout sidebarItems={items} title="Super Admin">
      <Outlet />
    </Layout>
  )
}
