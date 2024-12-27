import { useState, useEffect } from 'react'
import { Archive, Menu, User, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: any) => state.auth)

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
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
                <img 
                  className={`h-8 w-8 ${isScrolled ? "block" : "hidden"}`} 
                  src="https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/sgfshhqsowe7q8bocvv4.png" 
                  alt="Logo peras" 
                />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4 duration-300">
                <a 
                  href="#" 
                  className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  Inicio
                </a>
                <a 
                  href="#" 
                  className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  Opiniones
                </a>
                <a 
                  href="#" 
                  className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  Ubicación
                </a>
                {isAuthenticated ? (
                  <NavLink 
                    to={'/dashboard'} 
                    className={`flex items-center gap-2 bg-[#444] py-1 px-2 rounded-md text-white text-sm hover:bg-[#555] transition-colors ${isScrolled ? "block" : "hidden"}`}
                  >
                    <Archive size={18}/>
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink 
                    to={'/auth/login'} 
                    className={`flex items-center gap-2 bg-[#444] py-1 px-2 rounded-md text-white text-sm hover:bg-[#555] transition-colors ${isScrolled ? "block" : "hidden"}`}
                  >
                    <User size={18}/>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300`}
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
        
        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={`md:hidden fixed inset-0 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ marginTop: '5rem' }}
        >
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          <div className={`relative bg-white/90 backdrop-blur-md shadow-lg transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a 
                href="#" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
              >
                Inicio
              </a>
              <a 
                href="#" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
              >
                Opiniones
              </a>
              <a 
                href="#" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
              >
                Ubicación
              </a>
              {isAuthenticated ? (
                <NavLink 
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-[#444] hover:bg-[#555] rounded-lg transition-colors duration-200"
                >
                  <Archive size={18} />
                  Dashboard
                </NavLink>
              ) : (
                <NavLink 
                  to="/auth/login"
                  className="flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-[#444] hover:bg-[#555] rounded-lg transition-colors duration-200"
                >
                  <User size={18} />
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Backdrop for mobile menu */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`} 
        onClick={toggleMenu}
      />
    </>
  )
}

export default Navbar