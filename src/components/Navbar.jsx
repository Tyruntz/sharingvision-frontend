import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold text-slate-900">Article Dashboard</span>
        <nav className="flex gap-1">
          <NavLink to="/posts" className={linkClass}>
            All Posts
          </NavLink>
          <NavLink to="/posts/new" className={linkClass}>
            Add New
          </NavLink>
          <NavLink to="/preview" className={linkClass}>
            Preview
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
