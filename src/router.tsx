import { 
  BrowserRouter, 
  Routes, 
  Route,
  Navigate, 
} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './view/Home'
import Login from './view/auth/Login'
import Dashboard from './view/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
import { useSelector } from 'react-redux'
import ProtectedRoute from './helper/auth/ProtectedRoute'
import NotFound from './view/NotFound'

const Router = () => {

  // Uso del estado global de autenticacion
  const { isAuthenticated, user } = useSelector((state: any) => state.auth)

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

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<Dashboard userName={`${user ? user?.name : 'Usuario'}`} />} />
          </Route>
        </Route>

        {/* Ruta de Not Found cuando buscamos otra pagina */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router