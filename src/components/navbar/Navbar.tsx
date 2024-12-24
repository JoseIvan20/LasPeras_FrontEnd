import { useState, useEffect } from 'react'
import { Menu, User, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false) // Manejamos que si estamos scrolleando...
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Manejamos la muestra del menu hamburguesa en caso de modos responsivos

  useEffect(() => { // Si hay cambios en el scroll
    const handleScroll = () => {
      if (window.scrollY > 20) { // Cuando revase los 20 pixeles aparece el navbar
        setIsScrolled(true)
      } else {
        setIsScrolled(false) // Oculta el navbar
      }
    }

    window.addEventListener('scroll', handleScroll) // Metodo scroll

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => { // Funciona que maneja la interaccion con el menu hamrburguesa
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={`fixed top-4 rounded-full left-1/2 transform -translate-x-1/2 z-50 w-full md:w-[60%] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/50 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto t-5 px-4 sm:px-6 lg:px-8 ${isScrolled ? 'py-0' : 'py-4'}`}>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className={`h-8 w-8 ${isScrolled ? "block" : "hidden"}`} src="https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/sgfshhqsowe7q8bocvv4.png" alt="Logo peras" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 duration-300">
              <a href="#" className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Inicio</a>
              <a href="#" className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Opniones</a>
              <a href="#" className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Ubicación</a>
              <NavLink to={'/auth/login'} className={`flex items-center gap-2 bg-[#444] py-1 px-2 rounded-md text-white text-sm hover:bg-[#555] transition-colors ${isScrolled ? "block" : "hidden"}`}>
                <User size={18}/>
                Login
              </NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300`}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md rounded-b-lg">
            <a href="#" className="text-gray-800 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Inicio</a>
            <a href="#" className="text-gray-800 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Opiniones</a>
            <a href="#" className="text-gray-800 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Ubicación</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

