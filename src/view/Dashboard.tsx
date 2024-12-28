import { ChevronLeft, FileEditIcon, UserCircle2, Users } from "lucide-react"
import Navbar from "../components/navbar/NavbarDashboard"
import ReusableTable from "../components/table/ReusableTable"
import { ColumnDef } from "@tanstack/react-table"
import { UserBody } from "../types/user"
import { LabelBadge } from "../components/label/LabelBadge"
import { useUsers } from "../hooks/useUsers"
import { useMemo, useState } from "react"
import LoadingErrorHandler from "../components/chargeView/LoadingErrorHandler"
import Modal from "../components/modal/Modal"
import ModalUser from "./modal/ModalUser"
import { formatDateForInput } from "../utils/dateUtils"
import { useNavigate } from "react-router-dom"

interface DashboardProps { // Props de Dashboard
  userName: string
}

const Dashboard = ({ userName }: DashboardProps) => {

  const [isOpenModal, setIsModalOpen] = useState(false)
  const [userSelected, setUserSelected] = useState<UserBody>(Object)
  const navigate = useNavigate()

  // Hook de usuarios
  const {
    users,
    isPendingUsers,
    isErrorUsers,
  } = useUsers()

  // Abrir modal
  const handleClickEdit = (user: UserBody) => {
    setIsModalOpen(true)
    setUserSelected(user)
  }

  const handleCloseModal = () =>{
    setIsModalOpen(false)
  }

  const handleBackHome = () => {
    navigate('/')
  }

  // Numero consecitivo cubriendo el id de usuario
  const generateId = useMemo(() =>{
    return users.map((user: UserBody, index: number) => ({
      ...user,
      consecutiveNumber: index + 1
    }))
  }, [users])

  // Definicion de usuarios para pintarlos dentro de la tabla
  const columns: ColumnDef<UserBody>[] = [
    {
      header: 'ID',
      accessorKey: 'consecutiveNumber',
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
      cell: ({ row }) => {
        return formatDateForInput(row.original.date)
      }
    },
    {
      header: 'Cantidad personas',
      accessorKey: 'numberOfPeople',
    },
    {
      header: 'Tipo celebración',
      accessorKey: 'typeOfCelebration',
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: ({ row }) => {
        if (row.original.status === 'pending') {
          return <LabelBadge labelText='Pendiente' variant="warning" />
        } else if (row.original.status === 'in_progress') {
          return <LabelBadge labelText='En progreso' variant="info" />
        } else if (row.original.status === 'finalized') {
          return <LabelBadge labelText='Finalizado' variant="success" />
        } else if (row.original.status === 'overdue') {
          return <LabelBadge labelText='Atrasado' variant="error" />
        } else {
          return <LabelBadge labelText='No se obtuvo el estado' variant="error" />
        }
      }
    },
    {
      header: 'Acciones',
      id: 'actions',
      cell: ({ row }) => (
        <button
          className="bg-sky-100 text-sky-700 rounded-md p-1.5 hover:bg-sky-200 hover:shadow duration-300"
          onClick={() => handleClickEdit(row.original)}
          title="Editar"
          >
          <FileEditIcon size={22} />
        </button>
      )
    },
  ]

  // children => Contenido que le pasaremos al componente de LoadingErroHandler
  const contentUsers = (
    <div className="pt-1">
      <ReusableTable
        data={generateId}
        columns={columns}
        title="Tabla de usuarios"
        paragraph="Aquí puedes administrar tus usuarios"
        icon={Users}
        enabledButton={true}
        iconButton={ChevronLeft}
        buttonText="Inicio"
        onButtonClick={handleBackHome}
      />

      <Modal
        title="Informacion de usuario"
        icon={UserCircle2}
        isOpen={isOpenModal}
        onClose={() => setIsModalOpen(false)}
        size="xl" >
        <ModalUser userSelected={userSelected} onClose={handleCloseModal} />
      </Modal>
    </div>
  )

  return (
    <div className="h-screen bg-gray-100 p-5">
      <Navbar
        userName={userName} 
      />
      <LoadingErrorHandler
        isLoading={isPendingUsers}
        isError={isErrorUsers}
        loadingMessage="Cargando usuarios" 
      >
        {contentUsers}
      </LoadingErrorHandler>
    </div>
  )
}

export default Dashboard