import { useUsers } from "../hooks/useUsers"
import { UserBody } from "../types/user"
import useAuth from "../hooks/useAuth"
import MessageCard from "../components/card/MessageCard"
import { AlertTriangle, BadgeCheckIcon, Clock, Loader2, Users } from "lucide-react"
import Card from "../components/card/Card"
import { NavLink } from "react-router-dom"

const Dashboard = () => {

  const { users } = useUsers() // Usuarios
  const { admins } = useAuth() // Administrador

  // Sacar la cantidad de usuarios en estado "pending"
  const statusPending = users.filter((user: UserBody) => user.status === "pending").length
  // Sacar la cantidad de usuarios en estado "En progreso"
  const statusActive = users.filter((user: UserBody) => user.status === "in_progress").length
  // Sacar la cantidad de usuarios en estado de "finalizado"
  const statusFinalized = users.filter((user: UserBody) => user.status === "finalized").length
  // Sacar la cantidad usuario en estado de "Atrasado"
  const statusOverdue = users.filter((user: UserBody) => user.status === "overdue").length

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
          to={'/dashboard/users'}>
          <Card
            title="Usuarios"
            titleStyle="text-gray-600"
            icon={Users}
            iconColor="text-blue-700"
            bgColorIcon="bg-blue-50"
            sizeIcon={40}
            classNameTitle="font-bold text-xl md:text-2xl"
            content={`Total: ${users.length}`}
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
      </div>

    </div>
  )
}

export default Dashboard