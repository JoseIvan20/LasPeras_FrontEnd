// import { useState, useEffect } from 'react'
// import { AlignRight, Archive, User, X } from 'lucide-react'
// import { NavLink } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const Navbar = () => {
//   const { isAuthenticated } = useSelector((state: any) => state.auth)

//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true)
//       } else {
//         setIsScrolled(false)
//       }
//     }

//     window.addEventListener('scroll', handleScroll)

//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen)
//   }

//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId)
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' })
//       setIsMenuOpen(false)
//     }
//   }

//   const isLoginPage = window.location.pathname.includes('/auth/login') // No mostrar el navbar en login
//   const isActiveAccountPage = window.location.pathname.includes('/active-account') // No mostrar el navbar en activate account

//   if (isLoginPage) return null
//   if (isActiveAccountPage) return null

//   return (
//     <>
//       <nav
//         className={`fixed top-4 rounded-full left-1/2 transform -translate-x-1/2 z-50 w-full md:w-[60%] transition-all duration-300 ${
//           isScrolled
//             ? 'bg-white/50 backdrop-blur-lg shadow-lg'
//             : 'bg-transparent'
//         }`}
//       >
//         <div className={`max-w-7xl mx-auto t-5 px-4 sm:px-6 lg:px-8 ${isScrolled ? 'py-0' : 'py-4'}`}>
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <img 
//                   className={`h-8 w-8 ${isScrolled ? "block" : "hidden"}`} 
//                   src="https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/sgfshhqsowe7q8bocvv4.png" 
//                   alt="Logo peras" 
//                 />
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-center space-x-4 duration-300">
//                 <button 
//                   onClick={() => scrollToSection('inicio')} 
//                   className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
//                 >
//                   Inicio
//                 </button>
//                 <button 
//                   onClick={() => scrollToSection('opiniones')} 
//                   className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
//                 >
//                   Opiniones
//                 </button>
//                 <button 
//                   onClick={() => scrollToSection('ubicacion')} 
//                   className={`${isScrolled ? 'text-gray-800' : 'hidden cursor-none'} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
//                 >
//                   Ubicación
//                 </button>
//                 {isAuthenticated ? (
//                   <NavLink 
//                     to={'/dashboard'} 
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`flex items-center gap-2 bg-[#444] py-1 px-2 rounded-md text-white text-sm hover:bg-[#555] transition-colors ${isScrolled ? "block" : "hidden"}`}
//                   >
//                     <Archive size={18}/>
//                     Dashboard
//                   </NavLink>
//                 ) : (
//                   <NavLink 
//                     to={'/auth/login'} 
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`flex items-center gap-2 bg-[#444] py-1 px-2 rounded-md text-white text-sm hover:bg-[#555] transition-colors ${isScrolled ? "block" : "hidden"}`}
//                   >
//                     <User size={18}/>
//                     Login
//                   </NavLink>
//                 )}
//               </div>
//             </div>
//             <div className="md:hidden">
//               <button
//                 onClick={toggleMenu}
//                 className={`inline-flex items-center justify-center p-2 rounded-md ${
//                   isScrolled ? 'text-gray-800' : 'text-[#444] bg-gray-100 hover:bg-gray-200 hover:text-[#444]'
//                 } hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300`}
//               >
//                 {isMenuOpen ? (
//                   <X className="block h-6 w-6" aria-hidden="true" />
//                 ) : (
//                   <AlignRight className="block h-6 w-6" aria-hidden="true" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile menu, show/hide based on menu state */}
//         <div
//           className={`md:hidden fixed inset-0 transition-all duration-300 ease-in-out ${
//             isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//           }`}
//           style={{ marginTop: '5rem' }}
//         >
//           <div 
//             className="absolute inset-0 bg-black/20 backdrop-blur-sm"
//             onClick={toggleMenu}
//           />
//           <div className={`relative bg-white/90 backdrop-blur-md shadow-lg transform transition-all duration-300 ease-in-out ${
//             isMenuOpen ? 'translate-y-0' : '-translate-y-full'
//           }`}>
//             <div className="px-4 pt-4 pb-6 space-y-3">
//               <button 
//                 onClick={() => scrollToSection('inicio')} 
//                 className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
//               >
//                 Inicio
//               </button>
//               <button 
//                 onClick={() => scrollToSection('opiniones')} 
//                 className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
//               >
//                 Opiniones
//               </button>
//               <button 
//                 onClick={() => scrollToSection('ubicacion')} 
//                 className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
//               >
//                 Ubicación
//               </button>
//               {isAuthenticated ? (
//                 <NavLink 
//                   to="/dashboard"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-[#444] hover:bg-[#555] rounded-lg transition-colors duration-200"
//                 >
//                   <Archive size={18} />
//                   Dashboard
//                 </NavLink>
//               ) : (
//                 <NavLink 
//                   to="/auth/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-[#444] hover:bg-[#555] rounded-lg transition-colors duration-200"
//                 >
//                   <User size={18} />
//                   Login
//                 </NavLink>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       {/* Backdrop for mobile menu */}
//       <div 
//         className={`fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
//           isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
//         }`} 
//         onClick={toggleMenu}
//       />
//     </>
//   )
// }

// export default Navbar

import { useState, useEffect } from 'react'
import { AlignRight, Archive, User, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: any) => state.auth)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // No mostrar el navbar en login o activate account
  if (window.location.pathname.includes('/auth/login') || 
      window.location.pathname.includes('/active-account')) {
    return null
  }

  return (
    <nav
      className={`fixed top-4 rounded-full left-1/2 transform -translate-x-1/2 z-50 w-full md:w-[60%] transition-all duration-500 ${
        isScrolled
          ? 'bg-white/50 backdrop-blur-lg shadow-lg'
          : 'bg-white/30 backdrop-blur-sm'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                className="h-8 w-8 transition-opacity duration-500"
                src="https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/sgfshhqsowe7q8bocvv4.png" 
                alt="Logo peras" 
              />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <button 
                onClick={() => scrollToSection('inicio')} 
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('opiniones')} 
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
              >
                Opiniones
              </button>
              <button 
                onClick={() => scrollToSection('ubicacion')} 
                className={`text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
              >
                Ubicación
              </button>
              {isAuthenticated ? (
                <NavLink 
                  to="/dashboard"
                  className="flex items-center gap-2 bg-[#444] py-1.5 px-3 rounded-md text-white text-sm hover:bg-[#555] transition-colors duration-300"
                >
                  <Archive size={18}/>
                  Dashboard
                </NavLink>
              ) : (
                <NavLink 
                  to="/auth/login"
                  className="flex items-center gap-2 bg-[#444] py-1.5 px-3 rounded-md text-white text-sm hover:bg-[#555] transition-colors duration-300"
                >
                  <User size={18}/>
                  Login
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <AlignRight className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ marginTop: '5rem' }}
      >
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={toggleMenu}
        />
        <div className={`relative bg-white/90 backdrop-blur-md shadow-lg transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-3">
            <button 
              onClick={() => scrollToSection('inicio')} 
              className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('opiniones')} 
              className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              Opiniones
            </button>
            <button 
              onClick={() => scrollToSection('ubicacion')} 
              className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              Ubicación
            </button>
            {isAuthenticated ? (
              <NavLink 
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-[#444] hover:bg-[#555] rounded-lg transition-colors duration-200"
              >
                <Archive size={18} />
                Dashboard
              </NavLink>
            ) : (
              <NavLink 
                to="/auth/login"
                onClick={() => setIsMenuOpen(false)}
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
  )
}

export default Navbar