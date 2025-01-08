import { useComment } from "../hooks/useComment"
import Modal from "../components/modal/Modal"
import { useMemo, useState } from "react"
import { FileEditIcon, MessageCircle, MessageCirclePlus, MessageCirclePlusIcon, Trash } from "lucide-react"
import ModalComment from "./modal/ModalComment"
import { ColumnDef } from "@tanstack/react-table"
import { CommentBody } from "../types/price"
import MessageAlert from "../components/messages/MessageAlert"
import Swal from "sweetalert2"
import ReusableTable from "../components/table/ReusableTable"
import LoadingErrorHandler from "../components/chargeView/LoadingErrorHandler"
import MessageToast from "../components/messages/MessageToast"

const Comments = () => {

  // Hook de comentarios
  const {
    // Obtener comentarios
    getComments,
    isPendingComments,
    isErrorComments,

    // Eliminar comentario
    deleteComment
  } = useComment()

  // Abrir el modal
  const [isOpenModal, setIsModalOpen] = useState(false)
  const [commentSelected, setCommentSelected] = useState<CommentBody | null>(null)

  // Cierre de modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Edicion de comentario
  const handleClickEdit = (comment: CommentBody) => {
    setIsModalOpen(true)
    setCommentSelected(comment)
  }

  // Nuevo comentario
  const handleNewComment = () => {
    setIsModalOpen(true)
    setCommentSelected(null)
  }

  // Funcion que ejecuta la eliminacion del comentario
  const handleDeleteUser = async (_id: string) => {
    MessageAlert.showConfirmDialog({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el comentario?`,
      icon: 'question',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      onConfirm: async () => {
        try {
          Swal.fire({
            title: 'Eliminando comentario...',
            text: 'Por favor espere',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading()
            }
          })

          await deleteComment(_id)
        } catch (error) {
          MessageToast({ icon: 'error', title: 'Error', message: 'Hubo un problema al eliminar el comentario' })
        }
      },
      onCancel: () => {
        // MessageAlert maneja el mensaje de cancelación
        MessageToast({ icon: 'warning', title: 'Cancelado', message: 'El comentario no se elimino' })
      }
    })
  }

  // Sacar el numero consecutivo en vez de tomar el id del comentario
  const generateId = useMemo(() => {
    return getComments.map((price: CommentBody, index: number) => ({
      ...price,
      consecutiveNumber: index + 1
    }))
  }, [getComments])

  const columns: ColumnDef<CommentBody>[] = [
    {
      header: 'ID',
      accessorKey: 'consecutiveNumber',
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
    },
    {
      header: 'Rol',
      accessorKey: 'role',
    },
    {
      header: 'Clasificación',
      accessorKey: 'rating',
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
            onClick={() => handleDeleteUser(row.original._id)}
            title="Eliminar"
          >
            <Trash size={18} />
          </button>
        </div>
      )
    },
  ]

  const contentComments =(
    <div>
      <ReusableTable
        data={generateId}
        columns={columns}
        title="Tabla de comentarios"
        paragraph="Aquí puedes gestionar tus comentarios"
        icon={MessageCircle}
        enabledButton={true}
        iconButton={MessageCirclePlus}
        buttonText="Agregar comentario"
        onButtonClick={handleNewComment}
      />

      <Modal
        title={`${commentSelected ? 'Edición de comentario' : 'Creación de comentario'}`}
        icon={MessageCirclePlusIcon}
        isOpen={isOpenModal}
        onClose={() => setIsModalOpen(false)}
        size='md' >
        <ModalComment onClose={handleCloseModal} commentSelected={commentSelected} />
      </Modal>
    </div>
  )

  return (
    <>  
      <div className="h-screen bg-gray-100">
        <LoadingErrorHandler
          isLoading={isPendingComments}
          isError={isErrorComments}
          loadingMessage="Cargando comentarios..." 
        >
          {contentComments}
        </LoadingErrorHandler>
      </div>
    </>
  )
}

export default Comments