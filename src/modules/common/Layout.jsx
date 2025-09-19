import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function Layout({ sidebarItems, title, children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 flex flex-col">
        <Topbar title={title} />
        <main className="p-6 space-y-6">{children}</main>
      </div>
    </div>
  )
}
