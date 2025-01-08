// Hook de autenticacion

import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query"
import MessageToast from "../components/messages/MessageToast"
import { useDispatch, useSelector } from "react-redux"
import { logout, setCredentials } from "../helper/redux/AuthSlice"
import { 
  authenticated, 
  confirmAccount, 
  createAdmin, 
  getAdmins, 
  toggleUserStatus, 
  updateAdminById,
  resendConfirmationCode, 
  deleteUser,
  getAdminById
} from "../api/AuthAPI"
import { AdminBody, ConfirmUserBody } from "../types/admin"
import { useNavigate } from "react-router-dom"

interface UpdateAdminDataProps {
  _id: string
  formData: Partial<AdminBody>,
}

interface ToggleUserStatusProps {
  _id: string
  active: number
}

const useAuth = () => {

  const queryClient = useQueryClient()
  const dispath = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: any) => state.auth)

  // Consulta de usuarios
  const adminQuery = useQuery({
    queryFn: getAdmins,
    queryKey: ['admins'],
    refetchInterval: 1000,
    retry: 3
  })

  // Obtencion de usuario
  const currentUserQuery = useQuery({
    queryKey: ['currentUser', user?.id],
    queryFn: () => getAdminById(user?.id),
    enabled: !!user?.id,
    refetchInterval: 10000, // Refetch cada 30 segundos
  })

  // Mutacion de creacion de usuario
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

  // Mutacion de actualizacon de usuario
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

  // Mutacion para la baja o alta de usario
  const deactiveUserMutation = useMutation({
    mutationFn: ({ _id, active }: ToggleUserStatusProps) => toggleUserStatus(_id, active),
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

  // Mutacion de confirmacion de cuenta de usuario
  const confirmAccountMutation = useMutation({
    mutationFn: (formDataConfirm: ConfirmUserBody) => confirmAccount(formDataConfirm),
    onSuccess: data => {
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data.message}` })
      navigate('/auth/login')
    },
    onError: (error: any) => {
      let errorMessage = 'Error desconocido al confirmar la cuenta'
      let errorData = null
      
      if (error instanceof Error) {
        try {
          errorData = JSON.parse(error.message)
          errorMessage = errorData.message
        } catch (e) {
          errorMessage = error.message
        }
      }

      MessageToast({ 
        icon: 'error', 
        title: 'Error', 
        message: errorMessage
      })
    }
  })

  // Mutacion de reenvio de codigo
  const resendConfirmAccountMutation = useMutation({
    mutationFn: (formDataConfirm: ConfirmUserBody) => resendConfirmationCode(formDataConfirm),
    onSuccess: data => {
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data.message}` })
    },
     onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${messageFormat.message}` })
    }
  })

  // Mutacion de eliminar usuario
  const deleteAdminMutation = useMutation({
    mutationFn: (_id: string) => deleteUser(_id),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: data.message })
    },
    onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${messageFormat.message}` })
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

    logoutUser,

    // Alta - Baja de usuario
    toggleStatus: deactiveUserMutation.mutate,
    isPendingToggleStatus: deactiveUserMutation.isPending,
    isSuccessToggleStatus: deactiveUserMutation.isSuccess,
    isErrorToggleStatus: deactiveUserMutation.isError,

    // Confirmacion de cuenta
    confirmAccount: confirmAccountMutation.mutate,
    isPendingConfirmAccount: confirmAccountMutation.isPending,
    isSuccessConfirmAccount: confirmAccountMutation.isSuccess,
    isErrorConfirmAccount: confirmAccountMutation.isError,
    confirmAccountError: confirmAccountMutation.error as any,
   
    // Reenvio de codigo
    resendConfirmAccount: resendConfirmAccountMutation.mutate,
    isPendingResend: resendConfirmAccountMutation.isPending,
    isSuccessResend: resendConfirmAccountMutation.isSuccess,
    isErrorResend: resendConfirmAccountMutation.isError,

    // Eliminar usuario
    deleteAdmin: deleteAdminMutation.mutate,
    isPendingDeleteAdmin: deleteAdminMutation.isPending,
    isSuccessDeleteAdmin: deleteAdminMutation.isSuccess,
    isErrorDeleteAdmin: deleteAdminMutation.isError,

    // Obtencion de usuario
    currentUser: currentUserQuery.data,
    isCurrentUserLoading: currentUserQuery.isLoading,
    isCurrentUserError: currentUserQuery.isError,
  }
}

export default useAuth