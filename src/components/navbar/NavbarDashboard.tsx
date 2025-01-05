import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Home, LogOut, Menu, UserCircle2 } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Sidebar from '../sidebar/Sidebar'

const Navbar = () => {

  const { logoutUser } = useAuth()
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const isMobileMenu = useMediaQuery({ maxWidth: 767 })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user } = useSelector((state: any) => state.auth)
  
  // Ocultamos el dropwdown presionando cualquier parte de la pantalla
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const logout = () => {
    logoutUser()
  }

  const backHome = () => {
    navigate('/')
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 z-20 m-3 md:m-5 rounded-md shadow w-[auto]" >
        <div className="px-4 mx-auto">
          <div className="flex justify-between h-20">

            {isMobileMenu && (
              <div className="md:hidden">
                <button onClick={() => setSidebarOpen(true)} className="p-2 m-2 text-gray-500 hover:text-gray-600 bg-gray-200 rounded-md hover:shadow duration-200">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            )}
            
            {/* Título y subtítulo centrados */}
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <div className="text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-600">Bienvenido, {user?.name}</h1>
                <p className="text-sm text-gray-500">Panel de control</p>
              </div>
            </div>

            {/* Menú de usuario */}
            <div className="flex items-center">
              <div className="ml-3 relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <UserCircle2 size={30} className='text-gray-500' />

                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                      </button>
                      <button
                        onClick={backHome}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Home className="mr-2 h-4 w-4" />
                        Inicio
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar para móviles */}
      <div className={`md:hidden fixed inset-0 z-40 ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-75 bg-gray-600' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)}></div>
        <div className={`fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white transform ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default Navbar