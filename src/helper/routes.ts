import { Calendar1, House, Image, LayoutPanelTop, LucideIcon, MessageCircleMore, NotebookText, Shield, Users } from "lucide-react"
import Dashboard from "../view/Dashboard"
import User from "../view/gestion/price/Price"
import UserAuth from "../view/gestion/auth/UserAuth"
import Home from "../view/Home"
import Comments from "../view/Comments"
import GestionImage from "../view/GestionImage"
import Calendar from "../view/Calendar"

// Tipo para las rutas
export interface RouteConfig {
  key: string
  path?: string
  name: string
  icon: LucideIcon
  component?: React.ComponentType
  showInSidebar: boolean
  bgColor?: string
  textColor?: string
  subItems?: RouteConfig[]
}

export const routesDashboard: RouteConfig[] = [
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
  { // Imagenes
    key: 'gestion-imate',
    path: '/gestion-image',
    name: 'Imagenes',
    icon: Image,
    component: GestionImage,
    showInSidebar: true,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
  },
  {
    key: 'gestion',
    name: 'Gestión',
    icon: Users,
    showInSidebar: true,
    subItems: [
      {
        key: 'all-users',
        path: '/dashboard/cotizaciones',
        name: 'Cotizaciones',
        icon: NotebookText,
        component: User,
        showInSidebar: true,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600',
      },
      {
        key: 'admins',
        path: '/dashboard/auth-users',
        name: 'Gestión de Usuarios',
        icon: Shield,
        component: UserAuth,
        showInSidebar: true,
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-600',
      }
    ]
  },
  { // Calendario
    key: 'calendar',
    path: '/calendar',
    name: 'Calendario',
    icon: Calendar1,
    component: Calendar,
    showInSidebar: true,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
  },
  { // Comentarios
    key: 'comments',
    path: '/comments',
    name: 'Comentarios',
    icon: MessageCircleMore,
    component: Comments,
    showInSidebar: true,
    bgColor: 'bg-lime-100',
    textColor: 'text-lime-600',
  },
]