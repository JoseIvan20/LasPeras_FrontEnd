import { isAxiosError } from "axios"
import apiSendMail from "../utils/axios"
import { MailBody, MailResponse } from "../types/mail"

export const sendMail = async (bodyMail: MailBody): Promise<MailResponse> => {
  try {

    const { data } = await apiSendMail.post<MailResponse>('/send', bodyMail)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al enviar el correo')
    
  }
}

