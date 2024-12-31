import { Home, Shield, UserCog, Users } from "lucide-react"
import Dashboard from "../view/Dashboard"
import User from "../view/user/User"
import UserAuth from "../view/user/auth/UserAuth"

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
    name: 'Gestión de Usuarios',
    icon: Users,
    showInSidebar: true,
    subItems: [
      {
        key: 'all-users',
        path: '/dashboard/users',
        name: 'Todos los Usuarios',
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
  }
]