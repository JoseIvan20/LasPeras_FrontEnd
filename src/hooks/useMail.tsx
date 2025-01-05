import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMail } from '../api/MailAPI'
import { MailBody, MailResponse } from '../types/mail'
import { useState, useCallback } from 'react'

const useMail = () => {

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
      queryClient.invalidateQueries({ queryKey: ['prices'] })
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

export default useMail