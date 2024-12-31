import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/NavbarDashboard'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para pantallas grandes */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar para móviles */}
      <div className={`md:hidden fixed inset-0 z-40 ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-75 bg-gray-600' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)}></div>
        <div className={`fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white transform ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 m-2 text-gray-500 hover:text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
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