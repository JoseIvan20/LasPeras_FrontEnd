// hook de usuarios

import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUsers, updateUserById } from "../api/UserAPI"
import { UserBody } from "../types/user"
import MessageToast from "../components/messages/MessageToast"
import { useCallback, useState } from "react"
import { MailBody, MailResponse } from "../types/mail"
import { sendMail } from "../api/MailAPI"

interface UpdateUserDataProps {
  _id: string
  formData: Partial<UserBody>
}

export const useUsers = () => {

  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchInterval: 10000,
    retry: 3
  })

  const updateMutation: UseMutationResult<UserBody, Error, UpdateUserDataProps> = useMutation({
    mutationFn: ({ _id, formData }: UpdateUserDataProps) => updateUserById(_id, formData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      MessageToast({ icon: 'success', title: 'Éxitoso', message: `${data.message}` })
    },
    onError: error => {
      console.error('Error updating user:', error.message )
      MessageToast({ icon: 'error', title: 'Error', message: `${error.message}` })
    }
  })

  return {
    // Obtencion de usuarios
    users: userQuery.data || [],
    isPendingUsers: userQuery.isPending,
    isErrorUsers: userQuery.isError,

    // Actualizar usuario
    updateUser: updateMutation.mutate,
    isPendingUpdateUser: updateMutation.isPending,
    isErrorUpdateUser: updateMutation.isError,
  }
}

// Hook de email
export const useMail = () => {

  const queryClient = useQueryClient()

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const clearMessages = useCallback(() => {
    setSuccessMessage(null)
    setErrorMessage(null)
  }, [])

  const mailMutation = useMutation<MailResponse, Error, MailBody>({
    mutationFn: sendMail,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setSuccessMessage(data.message)
      setErrorMessage(null)
    },
    onError: error => {
      const errorParse = JSON.parse(error.message)
      setErrorMessage(errorParse.message)
      setSuccessMessage(null)
    }
  })
  
  return {
    mailSend: mailMutation.mutate,
    isPendingSend: mailMutation.isPending,
    isSuccessSend: mailMutation.isSuccess,
    isErrorSend: mailMutation.isError,
    successMessage,
    errorMessage,
    clearMessages
  }
}
