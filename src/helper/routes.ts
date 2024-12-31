import { Calendar, House, LayoutPanelTop, Shield, UserCog, Users } from "lucide-react"
import Dashboard from "../view/Dashboard"
import User from "../view/user/User"
import UserAuth from "../view/user/auth/UserAuth"
import Home from "../view/Home"

export const routesDashboard = [
  { // Home
    key: 'home',
    path: '/',
    name: 'Inicio',
    icon: House,
    component: Home,
    showInSidebar: true,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
  { // Dashboard
    key: 'dashboard',
    path: '/dashboard',
    name: 'Dashboard',
    icon: LayoutPanelTop,
    component: Dashboard,
    showInSidebar: true,
    bgColor: 'bg-sky-100',
    textColor: 'text-sky-600',
  },
  {
    key: 'users',
    name: 'Gestión de Usuarios',
    icon: Users,
    showInSidebar: true,
    subItems: [
      {
        key: 'all-users',
        path: '/dashboard/users',
        name: 'Usuarios',
        icon: UserCog,
        component: User,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600',
      },
      {
        key: 'admins',
        path: '/dashboard/auth-users',
        name: 'Administradores',
        icon: Shield,
        component: UserAuth,
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-600',
      }
    ]
  },
  { // Calendario
    key: 'calendar',
    path: '/calendar',
    name: 'Calendario',
    icon: Calendar,
    component: Dashboard,
    showInSidebar: true,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
]