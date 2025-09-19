import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'

export default function Sidebar({ items }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-4 hidden md:block">
      <div className="text-xl font-semibold mb-4">E-Com Panel</div>
      <nav className="space-y-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              clsx('block px-3 py-2 rounded-lg hover:bg-gray-100', isActive && 'bg-gray-100 font-medium')
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
