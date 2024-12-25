import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LogOut, UserCircle2 } from 'lucide-react'

interface NavbarDashboardProps {
  userName: string,
}

const Navbar = ({ 
  userName, 
}: NavbarDashboardProps) => {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
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
    console.log('Cerrar sesion')
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 z-20 m-3 md:m-5 rounded-md shadow w-[auto]" >
        <div className="px-4 mx-auto">
          <div className="flex justify-between h-20">
            
            {/* Título y subtítulo centrados */}
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <div className="text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-600">Bienvenido, {userName}</h1>
                <p className="text-sm text-gray-500">Portal de Configuración Usuarios</p>
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar