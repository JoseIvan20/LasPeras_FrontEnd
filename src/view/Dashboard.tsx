import { usePrice } from "../hooks/usePrice"
import { PriceBody } from "../types/price"
import useAuth from "../hooks/useAuth"
import MessageCard from "../components/card/MessageCard"
import { AlertTriangle, BadgeCheckIcon, Clock, Loader2, NewspaperIcon, Users } from "lucide-react"
import Card from "../components/card/Card"
import { NavLink } from "react-router-dom"
import { useComment } from "../hooks/useComment"

const Dashboard = () => {

  const { prices } = usePrice() // Usuarios
  const { admins } = useAuth() // Administrador
  const { getComments } = useComment() // Comentarios

  // Sacar la cantidad de usuarios en estado "pending"
  const statusPending = prices.filter((user: PriceBody) => user.status === "pending").length
  // Sacar la cantidad de usuarios en estado "En progreso"
  const statusActive = prices.filter((user: PriceBody) => user.status === "in_progress").length
  // Sacar la cantidad de usuarios en estado de "finalizado"
  const statusFinalized = prices.filter((user: PriceBody) => user.status === "finalized").length
  // Sacar la cantidad usuario en estado de "Atrasado"
  const statusOverdue = prices.filter((user: PriceBody) => user.status === "overdue").length

  return (
    <div className="h-screen bg-gray-100 p-5">
      <div className="flex gap-4 flex-wrap">
        <MessageCard
          title="Pendientes"
          icon={Clock}
          count={statusPending} 
          backgroundColor="bg-purple-400"
          titleClass="text-sm md:text-xl lg:text-2xl font-medium font-bold"
        />
        
        <MessageCard
          title="En progreso"
          icon={Loader2}
          count={statusActive} 
          backgroundColor="bg-cyan-400"
          titleClass="text-sm md:text-xl lg:text-2xl font-medium font-bold"
        />
        
        <MessageCard
          title="Finalizado"
          icon={BadgeCheckIcon}
          count={statusFinalized} 
          backgroundColor="bg-emerald-400"
          titleClass="text-sm md:text-xl lg:text-2xl font-medium font-bold"
        />
        
        <MessageCard
          title="Atrasados"
          icon={AlertTriangle}
          count={statusOverdue} 
          backgroundColor="bg-red-400"
          titleClass="text-sm md:text-xl lg:text-2xl font-medium font-bold"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        <NavLink
          to={'/dashboard/cotizaciones'}>
          <Card
            title="Cotizaciones"
            titleStyle="text-gray-600"
            icon={NewspaperIcon}
            iconColor="text-blue-700"
            bgColorIcon="bg-blue-50"
            sizeIcon={40}
            classNameTitle="font-bold text-xl md:text-2xl"
            content={`Total: ${prices.length}`}
            />
        </NavLink>
        
        <NavLink
          to={'/dashboard/auth-users'}>
          <Card
            title="Administradores"
            titleStyle="text-gray-600"
            icon={Users}
            iconColor="text-yellow-700"
            bgColorIcon="bg-yellow-50"
            sizeIcon={40}
            classNameTitle="font-bold text-xl md:text-2xl"
            content={`Total: ${admins.length}`}
            />
        </NavLink>
        
        <NavLink
          to={'/comments'}>
          <Card
            title="Comentarios"
            titleStyle="text-gray-600"
            icon={Users}
            iconColor="text-lime-700"
            bgColorIcon="bg-lime-50"
            sizeIcon={40}
            classNameTitle="font-bold text-xl md:text-2xl"
            content={`Total: ${getComments.length}`}
            />
        </NavLink>
      </div>

    </div>
  )
}

export default Dashboard