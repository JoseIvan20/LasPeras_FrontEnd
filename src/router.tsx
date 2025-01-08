import { 
  BrowserRouter, 
  Routes, 
  Route,
  Navigate, 
} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './view/Home'
import Login from './view/auth/Login'
import DashboardLayout from './layouts/DashboardLayout'
import { useSelector } from 'react-redux'
import ProtectedRoute from './helper/auth/ProtectedRoute'
import NotFound from './view/NotFound'
import PriceEdit from './view/gestion/price/PriceEdit'
import ActivateAccount from './view/auth/ActivateAccount'
import { routesDashboard, RouteConfig } from './helper/routes'
import React from 'react'

const Router = () => {

  // Uso del estado global de autenticacion
  const { isAuthenticated } = useSelector((state: any) => state.auth)

  // Función para generar rutas recursivamente
  const generateRoutes = (routes: RouteConfig[]): React.ReactNode => {
    return routes.map(route => {
      if (route.subItems) {
        // Si tiene subItems, genera rutas para cada uno
        return generateRoutes(route.subItems)
      }
      
      if (route.path && route.component) {
        return (
          <Route 
            key={route.key} 
            path={route.path} 
            element={<route.component />} 
          />
        )
      }
      return []
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} index /> {/* Ruta principal */}
          <Route 
            path='/auth/login'
            element={isAuthenticated ? <Navigate to='/dashboard' replace /> : <Login />} 
          /> {/* Ruta de login */}
        </Route>
        <Route 
          path='/active-account'
          element={<ActivateAccount />} 
        /> {/* Ruta de activacion de cuenta */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/dashboard/cotizaciones" element={<Price />} />
            <Route path="/gestion-image" element={<GestionImage />} />
            <Route path="/dashboard/auth-users" element={<UserAuth />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/comments" element={<Comments />} /> */}
            {generateRoutes(routesDashboard)}
            <Route path="/details-price/:id" element={<PriceEdit />} />
          </Route>
        </Route>

        {/* Ruta de Not Found cuando buscamos otra pagina */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router