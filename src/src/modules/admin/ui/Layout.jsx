import { Outlet } from 'react-router-dom'
import Layout from '../../common/Layout.jsx'

const items = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Users', to: '/admin/users' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'Reports', to: '/admin/reports' },
  { label: 'Content', to: '/admin/content' },
]

export default function AdminLayout() {
  return (
    <Layout sidebarItems={items} title="Admin">
      <Outlet />
    </Layout>
  )
}
