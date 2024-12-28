import { isAxiosError } from "axios"
import { MailBody, MailResponse } from "../types/mail"
import apiURL from "../utils/axios"

export const sendMail = async (bodyMail: MailBody): Promise<MailResponse> => {
  try {

    const { data } = await apiURL.post<MailResponse>('/createUserAndSendEmail', bodyMail)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al enviar el correo')
    
  }
}

