import { useMemo } from "react"
import { PriceBody } from "../../../types/price"
import { useNavigate } from "react-router-dom"
import { usePrice } from "../../../hooks/usePrice"
import { LabelBadge } from "../../../components/label/LabelBadge"
import { formatDateForInput } from "../../../utils/dateUtils"
import { FileEditIcon, NotebookPenIcon, Trash } from "lucide-react"
import ReusableTable from "../../../components/table/ReusableTable"
import { ColumnDef } from "@tanstack/react-table"
import LoadingErrorHandler from "../../../components/chargeView/LoadingErrorHandler"
import MessageAlert from "../../../components/messages/MessageAlert"
import Swal from "sweetalert2"
import MessageToast from "../../../components/messages/MessageToast"

const Price = () => {

  const navigate = useNavigate() // Navegacion

  // Hook de usuarios
  const {
    prices,
    isPendingPrice,
    isErrorPrice,

    deletePrice
  } = usePrice()

  // Funcion que abre el modal tomando el usuario cuando edite
  const handleClickEdit = (price: PriceBody) => {
    navigate(`/details-price/${price._id}`, { state: { price } })
  }

  // Sacar el numero consecutivo en vez de tomar el id del usuario
  const generateId = useMemo(() => {
    return prices.map((price: PriceBody, index: number) => ({
      ...price,
      consecutiveNumber: index + 1
    }))
  }, [prices])

  // Funcion que ejecuta la eliminacion de la cotización
  const handleDeletePrice = async (_id: string) => {
    MessageAlert.showConfirmDialog({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la cotización? Está acción no se puede deshacer`,
      icon: 'question',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      onConfirm: async () => {
        try {
          Swal.fire({
            title: 'Eliminando cotización...',
            text: 'Por favor espere',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading()
            }
          })

          await deletePrice(_id)
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar la cotización',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: "#444444"
          })
        }
      },
      onCancel: () => {
        // MessageAlert maneja el mensaje de cancelación
        MessageToast({ icon: 'warning', title: 'Cancelado', message: 'La cotización no se elimino' })
      }
    })
  }

  // Definicion de usuarios para pintarlos dentro de la tabla
  const columns: ColumnDef<PriceBody>[] = [
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
        } else if (row.original.status === 'canceled') {
          return <LabelBadge labelText='Cancelado' variant="error" />
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
            <FileEditIcon size={22} />
          </button>

          <button
            className="bg-red-100 text-red-700 rounded-md p-1.5 hover:bg-red-200 hover:shadow duration-300"
            onClick={() => handleDeletePrice(row.original._id)}
            title="Eliminar"
            >
            <Trash size={18} />
          </button>
        </div>
      )
    },
  ]

  // children => Contenido que le pasaremos al componente de LoadingErrorHandler
  const contentUsers = (
    <div>
      <ReusableTable
        data={generateId}
        columns={columns}
        title="Tabla de cotizaciones"
        paragraph="Aquí puedes administrar tus cotizaciones"
        icon={NotebookPenIcon}
      />

      {/* {!isMobile && (
        <Modal
          title="Informacion de cotización"
          icon={NotebookText}
          isOpen={isOpenModal}
          onClose={() => setIsModalOpen(false)}
          size="xl" >
          <ModalUser userSelected={userSelected} onClose={handleCloseModal} />
        </Modal>
      )} */}

    </div>
  )

  return (
    <div className="h-screen bg-gray-100">
      <LoadingErrorHandler
        isLoading={isPendingPrice}
        isError={isErrorPrice}
        loadingMessage="Cargando cotizaciones..."
      >
        {contentUsers}
      </LoadingErrorHandler>
    </div>
  )
}

export default Price