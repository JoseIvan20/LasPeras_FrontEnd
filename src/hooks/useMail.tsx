import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMail } from '../api/MailAPI'
import { MailBody, MailResponse } from '../types/mail'
import MessageToast from '../components/messages/MessageToast'

const useMail = () => {

  const queryClient = useQueryClient()

  const mailMutation = useMutation<MailResponse, Error, MailBody>({
    mutationFn: sendMail,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['prices'] })
      MessageToast({ icon: 'success', title: 'Éxitoso', message: `${data.message}` })
    },
    onError: error => {
      const errorParse = JSON.parse(error.message)
      MessageToast({ icon: 'success', title: 'Éxitoso', message: `${errorParse.message}` })
    }
  })
  
  return {
    mailSend: mailMutation.mutate,
    isPendingSend: mailMutation.isPending,
    isSuccessSend: mailMutation.isSuccess,
    isErrorSend: mailMutation.isError,
  }
}

export default useMail