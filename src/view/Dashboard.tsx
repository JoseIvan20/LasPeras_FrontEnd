import { Users } from "lucide-react"
import Navbar from "../components/navbar/NavbarDashboard"
import ReusableTable from "../components/table/ReusableTable"
import { ColumnDef } from "@tanstack/react-table"

interface DashboardProps { // Props de Dashboard
  userName: string
}

interface User { // Props de un usuario
  id: number
  name: string
  email: string
}

const Dashboard = ({ userName }: DashboardProps) => {

  // Deifnicion de usuarios para pintarlos dentro de la tabla
  const columns: ColumnDef<User>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
  ]

  // Usuarios ejemplares
  const data: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    // ... más datos
  ]

  return (
    <div className="h-screen bg-gray-100 p-5">
      <Navbar
        userName={userName} />

      <div className="pt-1">
        <ReusableTable
          data={data}
          columns={columns}
          title="Tabla de usuarios"
          paragraph="Aquí puedes administrar tus usuarios"
          icon={Users}
          enabledButton={false}
          />
      </div>
    </div>
  )
}

export default Dashboard