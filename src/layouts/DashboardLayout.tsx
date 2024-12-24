import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout