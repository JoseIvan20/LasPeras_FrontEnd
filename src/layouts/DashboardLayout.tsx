import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/NavbarDashboard'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'

const DashboardLayout = () => {

  // Uso del hook de obtencion de usuario
  const { 
    currentUser, 
    isCurrentUserError,
    isCurrentUserLoading,
    logoutUser
  } = useAuth()
  
  // Aplicamos useEffect cuando ocurra un cambio en la sesion
  useEffect(() => {
    if (!isCurrentUserLoading && (isCurrentUserError || !currentUser)) {
      logoutUser()
    }
  }, [currentUser, isCurrentUserError, logoutUser])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para pantallas grandes */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout