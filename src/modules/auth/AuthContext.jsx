import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ecom_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('ecom_user', JSON.stringify(user))
    else localStorage.removeItem('ecom_user')
  }, [user])

  const signIn = ({ email, role }) => {
    const fakeUser = { id: 'u1', name: 'Demo User', email, role } // roles: superadmin | admin | seller | user
    setUser(fakeUser)
    return fakeUser
  }

  const signOut = () => setUser(null)

  return (
    <AuthCtx.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  )
}
