// Api de whatsapp
import { WhatsAppBody } from '../types/whatsapp'
import { handleApiError } from "../helper/errorHandler"
import apiURL from "../utils/axios"

// Obtención de la configuración de whatsapp
export const getConfigWhats = async (): Promise<WhatsAppBody> => {
  try {

    const { data } = await apiURL.get('/getConfig')
    // const { data } = await apiURL.get('/whatsapp')
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Creacion / Actualizacion de configuracion
export const createOrUpdateConfig = async (whatsData: Partial<WhatsAppBody>): Promise<WhatsAppBody> => {
  try {

    const { data } = await apiURL.post('/configWhats', whatsData)
    // const { data } = await apiURL.post('/whatsapp/configWhats', whatsData)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}
