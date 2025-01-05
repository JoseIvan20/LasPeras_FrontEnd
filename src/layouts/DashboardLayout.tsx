import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/NavbarDashboard'

const DashboardLayout = () => {

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