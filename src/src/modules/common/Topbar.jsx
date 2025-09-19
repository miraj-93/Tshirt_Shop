import { useAuth } from '../auth/AuthContext.jsx'

export default function Topbar({ title }) {
  const { user, signOut } = useAuth()
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4">
      <div className="font-semibold">{title}</div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{user?.name} ({user?.role})</span>
        <button onClick={signOut} className="px-3 py-1.5 text-sm rounded-lg bg-gray-900 text-white">Sign out</button>
      </div>
    </header>
  )
}
