import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

const roles = ['superadmin', 'admin', 'seller', 'user']

export default function Login() {
  const [email, setEmail] = useState('demo@example.com')
  const [role, setRole] = useState('superadmin')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const u = signIn({ email, role })
    navigate(`/${u.role}`)
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="card p-8 w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-center">Sign in (Demo)</h1>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full border rounded-lg px-3 py-2">
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <button className="w-full bg-gray-900 text-white rounded-lg py-2">Continue</button>
      </form>
    </div>
  )
}
