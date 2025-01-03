import { useMemo, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { FileEditIcon, UserCircle2, UserPlus2Icon } from "lucide-react"
import { LabelBadge } from "../../../components/label/LabelBadge"
import ReusableTable from "../../../components/table/ReusableTable"
import Modal from "../../../components/modal/Modal"
import UserAuthEdit from "./UserAuthEdit"
import { ColumnDef } from "@tanstack/react-table"
import LoadingErrorHandler from "../../../components/chargeView/LoadingErrorHandler"
import { AdminBody } from "../../../types/admin"

const UserAuth = () => {

  const [isOpenModal, setIsModalOpen] = useState(false) // Modal
  const [adminSelected, setAdminSelected] = useState<AdminBody | null>(null) // Admin

  // Hook de admins
  const {
    admins,
    isPendingAdmins,
    isErrorAdmins
  } = useAuth()

  const handleClickEdit = (admin: AdminBody) => {
    setIsModalOpen(true)
    setAdminSelected(admin)
  }

  const handleNewAdmin = () => {
    setIsModalOpen(true)
    setAdminSelected(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setAdminSelected(null)
  }

  // Sacar el numero consecutivo en vez de tomar el id del admin
  const generateId = useMemo(() =>{
    return admins.map((admin: AdminBody, index: number) => ({
      ...admin,
      consecutiveNumber: index + 1
    }))
  }, [admins])

  // Definicion de usuarios para pintarlos dentro de la tabla
  const columns: ColumnDef<AdminBody>[] = [
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
      accessorKey: 'consumer',
    },
    {
      header: 'Rol',
      accessorKey: 'rol',
      cell: ({ row }) => (
        row.original.rol === 1 ? 
        (
          <LabelBadge labelText="Administrador" variant="info" />
        ) : (
          <LabelBadge labelText="Usuario" variant="info" />
        )
      ),
    },
    {
      header: 'Activo',
      accessorKey: 'active',
      cell: ({ row }) => (
        row.original.active === 1 ?
        (
          <LabelBadge labelText="Activo" variant="success" />
        ) : (
          <LabelBadge labelText="Inactivo" variant="error" />
        )
      ),
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

  // children => Contenido que le pasaremos al componente de LoadingErrorHandler
  const contentAdmins = (
    <div>
      <ReusableTable
        data={generateId}
        columns={columns}
        title="Tabla de usuarios"
        paragraph="Aquí puedes administrar tus usuarios"
        icon={UserCircle2}
        enabledButton={true}
        iconButton={UserPlus2Icon}
        buttonText="Agregar administrador"
        onButtonClick={handleNewAdmin}
      />

      <Modal
        title={`${adminSelected ? 'Edición de administrador' : 'Creación de administrador'}`}
        icon={UserCircle2}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        size="xl" >
        <UserAuthEdit adminSelected={adminSelected} onClose={handleCloseModal} />
      </Modal>

    </div>
  )

  return (
    <div className="h-screen bg-gray-100">
      <LoadingErrorHandler
        isLoading={isPendingAdmins}
        isError={isErrorAdmins}
        loadingMessage="Cargando administradores..." 
      >
        {contentAdmins}
      </LoadingErrorHandler>
    </div>
  )
}

export default UserAuth