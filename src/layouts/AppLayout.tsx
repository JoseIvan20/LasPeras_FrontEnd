import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout