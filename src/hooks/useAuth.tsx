// Hook de autenticacion

import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query"
import MessageToast from "../components/messages/MessageToast"
import { useDispatch } from "react-redux"
import { logout, setCredentials } from "../helper/redux/AuthSlice"
import { authenticated, createAdmin, getAdmins, updateAdminById } from "../api/AuthAPI"
import { AdminBody } from "../types/admin"

interface UpdateAdminDataProps {
  _id: string
  formData: Partial<AdminBody>
}

const useAuth = () => {

  const queryClient = useQueryClient()
  const dispath = useDispatch()

  const adminQuery = useQuery({
    queryFn: getAdmins,
    queryKey: ['admins'],
    retry: 3
  })

  // Mutacion de creacion de admin
  const createAdminMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      MessageToast({ icon: "success", title: "Éxito", message: `${data.message}` })
    },
    onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({ icon: "error", title: "Error", message: messageFormat.message })
    }
  })

  // Mutacion de actualizacon de admin
  const updateAdminMutation: UseMutationResult<AdminBody, Error, UpdateAdminDataProps> = useMutation({
    mutationFn: ({ _id, formData }: UpdateAdminDataProps) => updateAdminById(_id, formData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      MessageToast({ icon: 'success', title: 'Éxitoso', message: `${data.message}` })
    },
    onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: messageFormat.error })
    }
  })

  // Mutacion de login
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

    // Data de admins
    admins: adminQuery.data || [],
    isPendingAdmins: adminQuery.isPending,
    isErrorAdmins: adminQuery.isError,

    // Creacion de usuario
    createAdmin: createAdminMutation.mutate,
    isPendingCreateAdmin: createAdminMutation.isPending,
    isSuccessCreateAdmin: createAdminMutation.isSuccess,
    isErrorCreateAdmin: createAdminMutation.isError,

    // Actualizacion de usuario
    updateAdmin: updateAdminMutation.mutate,
    isPendingUpdateAdmin: updateAdminMutation.isPending,
    isSuccessUpdateAdmin: updateAdminMutation.isSuccess,
    isErrorUpdateAdmin: updateAdminMutation.isError,

    // Autenticacion
    loginUser: authMutation.mutate,
    isPendingLogin: authMutation.isPending,
    isErrorLogin: authMutation.isError,

    logoutUser
  }
}

export default useAuth