import { Home, UserCog } from "lucide-react"
import Dashboard from "../view/Dashboard"
import User from "../view/user/User"

// Archivo que contiene todos los modulos de rutas dentro del Dashboard
export const routesDashboard = [
  { // Dashboard
    key: 'dashboard',
    path: '/dashboard',
    name: 'Dashboard',
    icon: Home,
    component: Dashboard,
    showInSidebar: true,
    bgColor: 'bg-sky-100',
    textColor: 'text-sky-600',
  },
  {
    key: 'users',
    path: '/dashboard/users',
    name: 'Usuarios',
    icon: UserCog,
    component: User,
    showInSidebar: true,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
  }
]