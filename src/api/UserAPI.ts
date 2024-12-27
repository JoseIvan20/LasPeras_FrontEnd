import { isAxiosError } from "axios"
import apiURL from "../utils/axios"
import { AuthBody, UserBody } from "../types/user"

// Ontiene usuarios
export const getUsers = async () => {
  try {

    const { data } = await apiURL.get('/user')
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al obtener usuarios')
    
  }
}

// Actualiza el usuario
export const updateUserById = async (_id: string, userData: Partial<UserBody>): Promise<UserBody> => {
  try {

    const { data } = await apiURL.put(`/user/${_id}`, userData)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al actualizar el usuario')
    
  }
}

// Inicio de sesion de usuario
export const authenticated = async (authData: Partial<AuthBody>): Promise<AuthBody> => {
  try {

    const { data } = await apiURL.post('/user/login', authData)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data  || 'Error en la petición'
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al autenticar el usuario')
    
  }
}