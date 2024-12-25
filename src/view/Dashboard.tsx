import { Eye, Users } from "lucide-react"
import Navbar from "../components/navbar/NavbarDashboard"
import ReusableTable from "../components/table/ReusableTable"
import { ColumnDef } from "@tanstack/react-table"
import { UserBody } from "../types/user"
import { LabelBadge } from "../components/label/LabelBadge"
import CustomButton from "../components/button/CustomButton"

interface DashboardProps { // Props de Dashboard
  userName: string
}

const Dashboard = ({ userName }: DashboardProps) => {

  // Deifnicion de usuarios para pintarlos dentro de la tabla
  const columns: ColumnDef<UserBody>[] = [
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
    {
      header: 'Teléfono',
      accessorKey: 'phone',
    },
    {
      header: 'Fecha evento',
      accessorKey: 'date',
    },
    {
      header: 'Cantidad personas',
      accessorKey: 'numberofpeople',
    },
    {
      header: 'Tipo celebración',
      accessorKey: 'typeofcelebration',
    },
    {
      header: 'Estado',
      accessorKey: 'typeOfCelebration',
      cell: ({ row }) => {
        row.original.status
        return (
          <LabelBadge labelText="En espera" variant="warning" />
        )
      }
    },
    {
      header: 'Acciones',
      id: 'actions',
      cell: ({ row }) => {
        <CustomButton
          icon={Eye}
          key={row.id}
          type="button" />
      }
    },
  ]

  // Usuarios ejemplares
  const data: UserBody[] = [
    {
      id: 1,
      name: 'Jose Ivan Jimenez Guerrero',
      email: 'ivanjg1029@gmail.com',
      phone: '123456789',
      date: '2021-10-10',
      numberofpeople: 10,
      typeofcelebration: 'Boda',
      status: 'active'
    },
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