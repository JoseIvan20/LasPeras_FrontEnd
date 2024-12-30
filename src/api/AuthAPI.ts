import { isAxiosError } from "axios"
import { AuthBody } from "../types/user"
import apiURL from "../utils/axios"

// Inicio de sesion de usuario
export const authenticated = async (authData: Partial<AuthBody>): Promise<AuthBody> => {
  try {

    const { data } = await apiURL.post('/loginUser', authData)
    // const { data } = await apiURL.post('/auth/login', authData)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data  || 'Error en la petición'
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al autenticar el usuario')
    
  }
}