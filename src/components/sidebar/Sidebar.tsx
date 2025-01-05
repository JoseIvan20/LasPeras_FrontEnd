import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { routesDashboard } from '../../helper/routes'
import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const location = useLocation()

  const isSubRoute = useCallback((path: string) => {
    return routesDashboard.some(route => 
      route.subItems && route.subItems.some(subItem => subItem.path === path)
    )
  }, [])

  useEffect(() => {
    const currentPath = location.pathname
    const parentMenu = routesDashboard.find(route => 
      route.subItems && route.subItems.some(subItem => subItem.path === currentPath)
    )
    
    setExpandedMenus(prev => {
      if (parentMenu && !prev.includes(parentMenu.key)) {
        return [...prev, parentMenu.key]
      } else if (!isSubRoute(currentPath)) {
        return []
      }
      return prev
    })
  }, [location, isSubRoute])

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => 
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    )
  }

  const renderMenuItem = (route: any, isSubItem = false) => {
    const hasSubItems = route.subItems && route.subItems.length > 0
    const isExpanded = expandedMenus.includes(route.key)
    const isActive = location.pathname === route.path || 
      (hasSubItems && route.subItems.some((subItem: any) => subItem.path === location.pathname))

    return (
      <div key={route.key} className={`${isSubItem ? 'ml-4' : ''}`}>
        {route.path ? (
          <NavLink
            to={route.path}
            end={route.path === '/dashboard'}
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50'}
            `}
          >
            {({ isActive }) => (
              <>
                <motion.div className="relative mr-3" initial={false}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <route.icon
                      className={`h-5 w-5 transition-colors duration-200 ${isActive ? route.textColor : 'text-gray-400'}`}
                    />
                  </div>
                  <motion.div
                    className={`flex items-center gap-2 p-2 rounded-md ${
                      isActive ? route.bgColor : 'bg-transparent'
                    }`}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    variants={{
                      hidden: { scale: 0.8, opacity: 0 },
                      visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } }
                    }}
                    layoutId={`background-${route.bgColor}`}
                  >
                    <route.icon
                      className={`h-5 w-5 ${
                        isActive ? route.textColor : 'text-transparent'
                      }`} 
                    />
                  </motion.div>
                </motion.div>
                <span className="font-normal text-base text-gray-600">
                  {route.name}
                </span>
              </>
            )}
          </NavLink>
        ) : (
          <button
            onClick={() => toggleMenu(route.key)}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out hover:bg-gray-50
              ${isActive ? 'bg-gray-50' : ''}
            `}
          >
            <div className="flex items-center">
              <route.icon className={`h-5 w-5 mr-3 ${isActive ? route.textColor : 'text-gray-400'}`} />
              <span className={`font-normal text-base ${isActive ? route.textColor : 'text-gray-600'}`}>{route.name}</span>
            </div>
            {hasSubItems && (
              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        <AnimatePresence>
          {hasSubItems && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 overflow-hidden"
            >
              {route.subItems.map((subItem: any) => renderMenuItem(subItem, true))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <aside className="w-64 bg-white h-full border-r border-gray-200">
      <div className="px-4 py-6">
        <nav className="space-y-1">
          {routesDashboard.filter(route => route.showInSidebar).map(route => renderMenuItem(route))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar