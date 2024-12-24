import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './view/Home'
import Login from './view/auth/Login'
import Dashboard from './view/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
// import DashboardLayout from './layouts/DashboardLayout'
// import { routesDashboard } from './helper/routes'

const Router = () => {

  // const DashboardComponent = routesDashboard[0].component

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} index /> {/* Ruta principal */}
          <Route path='/auth/login' element={<Login />} /> {/* Ruta de login */}
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard userName='Jose Ivan' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router