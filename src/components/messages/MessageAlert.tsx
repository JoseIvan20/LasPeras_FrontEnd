import Swal, { SweetAlertIcon } from 'sweetalert2'

interface MessageAlertProps {
  title: string,
  text: string, 
  icon: SweetAlertIcon,
  confirmButtonText: string,
  showCancelButton: boolean
  showConfirmButton: boolean
  cancelButtonText: string
  onConfirm: () => void
  onCancel: () => void
}


const MessageAlert = {
  showConfirmDialog: ({ title, text, icon, confirmButtonText, showCancelButton, showConfirmButton, cancelButtonText, onConfirm, onCancel }: MessageAlertProps) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
    })

    swalWithBootstrapButtons.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: showConfirmButton,
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#4444',
      cancelButtonText: cancelButtonText,
      cancelButtonColor: '#e33232',
      showCancelButton: showCancelButton,
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
          onConfirm()
      } else if(result.dismiss === Swal.DismissReason.cancel) {
        onCancel()
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El usuario no se elimino",
          icon: "warning",
          confirmButtonText: "Cerrar",
          confirmButtonColor: "#444444"
        })
      }
    })

  }
}

export default MessageAlert