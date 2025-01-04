import { useMemo, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { FileEditIcon, Trash, UserCircle2, UserPlus2Icon } from "lucide-react"
import { LabelBadge } from "../../../components/label/LabelBadge"
import ReusableTable from "../../../components/table/ReusableTable"
import Modal from "../../../components/modal/Modal"
import UserAuthEdit from "./UserAuthEdit"
import { ColumnDef } from "@tanstack/react-table"
import LoadingErrorHandler from "../../../components/chargeView/LoadingErrorHandler"
import { AdminBody } from "../../../types/admin"
import MessageAlert from "../../../components/messages/MessageAlert"
import Swal from "sweetalert2"

const UserAuth = () => {

  const [isOpenModal, setIsModalOpen] = useState(false) // Modal
  const [adminSelected, setAdminSelected] = useState<AdminBody | null>(null) // Admin

  // Hook de admins
  const {
    admins,
    isPendingAdmins,
    isErrorAdmins,

    deleteAdmin,
    // isPendingDeleteAdmin,
    // isSuccessDeleteAdmin
  } = useAuth()

  // Edicion de usuario
  const handleClickEdit = (admin: AdminBody) => {
    setIsModalOpen(true)
    setAdminSelected(admin)
  }

  // Nuevo usuario
  const handleNewAdmin = () => {
    setIsModalOpen(true)
    setAdminSelected(null)
  }

  // Cierre del modal
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

  // Funcion que ejecuta la eliminacion del usuario
  const handleDeleteUser = async (_id: string, userName: string) => {
    MessageAlert.showConfirmDialog({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al usuario ${userName}?`,
      icon: 'question',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      onConfirm: async () => {
        try {
          Swal.fire({
            title: 'Eliminando usuario...',
            text: 'Por favor espere',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading()
            }
          })

          await deleteAdmin(_id)
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar el usuario',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: "#444444"
          })
        }
      },
      onCancel: () => {
        // MessageAlert maneja el mensaje de cancelación
      }
    })
  }

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
      header: 'Estado',
      accessorKey: 'status',
      cell: ({ row }) => {
        if (row.original.status === 'pending') {
          return <LabelBadge labelText='Pendiente' variant="warning" />
        } else if (row.original.status === 'confirmed') {
          return <LabelBadge labelText='Confirmado' variant="info" />
        } else if (row.original.status === 'active') {
          return <LabelBadge labelText='Activado' variant="success" />
        } else if (row.original.status === 'expired') {
          return <LabelBadge labelText='Expirado' variant="error" />
        } else {
          return <LabelBadge labelText='No se obtuvo el estado' variant="error" />
        }
      }
    },
    {
      header: 'Acciones',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="bg-sky-100 text-sky-700 rounded-md p-1.5 hover:bg-sky-200 hover:shadow duration-300"
            onClick={() => handleClickEdit(row.original)}
            title="Editar"
            >
            <FileEditIcon size={18} />
          </button>

          <button
            className="bg-red-100 text-red-700 rounded-md p-1.5 hover:bg-red-200 hover:shadow duration-300"
            onClick={() => handleDeleteUser(row.original._id, row.original.name)}
            title="Eliminar"
          >
            <Trash size={18} />
          </button>
        </div>
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
        paragraph="Aquí puedes gestionar tus usuarios"
        icon={UserCircle2}
        enabledButton={true}
        iconButton={UserPlus2Icon}
        buttonText="Agregar usuario"
        onButtonClick={handleNewAdmin}
      />

      <Modal
        title={`${adminSelected ? 'Edición de usuario' : 'Creación de usuario'}`}
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
        loadingMessage="Cargando usuarios..." 
      >
        {contentAdmins}
      </LoadingErrorHandler>
    </div>
  )
}

export default UserAuth