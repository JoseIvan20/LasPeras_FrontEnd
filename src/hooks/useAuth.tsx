// Hook de autenticacion

import { useMutation } from "@tanstack/react-query"
import { authenticated } from "../api/UserAPI"
import MessageToast from "../components/messages/MessageToast"
import { useDispatch } from "react-redux"
import { logout, setCredentials } from "../helper/redux/AuthSlice"


const useAuth = () => {

  const dispath = useDispatch()

  const authMutation = useMutation({
    mutationFn: authenticated,
    onSuccess: data => {
      MessageToast({ icon: "success", title: "Éxito", message: `${data.message}` })
      // Guardamos la sesion en redux
      dispath(setCredentials(data))
    },
    onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({ icon: "error", title: "Error", message: messageFormat.message })
    }
  })

  // Cierre de sesion
  const logoutUser = () => {
    dispath(logout())
    MessageToast({ icon: "info", title: "Éxito", message: "Sesión cerrada" })
  }

  return {
    loginUser: authMutation.mutate,
    isPendingLogin: authMutation.isPending,
    isErrorLogin: authMutation.isError,

    logoutUser
  }
}

export default useAuth