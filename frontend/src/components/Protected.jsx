import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Api } from '../services/Api.jsx'

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Api.get('/me')
        setIsAuth(true)
      } catch {
        setIsAuth(false)
      }
    }

    checkAuth()
  }, [])

  // ⏳ Espera respuesta real
  if (isAuth === null) {
    return <p>Cargando...</p>
  }

  if (!isAuth) {
    return <Navigate to="/Login" />
  }

  return children
}

export { ProtectedRoute as Protected }