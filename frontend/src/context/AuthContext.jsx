import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('fitlab-user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const response = await authApi.login(credentials)
    const { token, user } = response.data
    localStorage.setItem('fitlab-token', token)
    localStorage.setItem('fitlab-user', JSON.stringify(user))
    setUser(user)
    return user
  }

  const register = async (payload) => {
    const response = await authApi.register(payload)
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('fitlab-token')
    localStorage.removeItem('fitlab-user')
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
