// Archivo de proteccion de rutas

import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirige a login, pero guarda la ubicación actual para redirigir después del login
    return <Navigate to='/auth/login' state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute