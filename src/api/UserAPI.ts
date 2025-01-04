import { isAxiosError } from "axios"
import apiURL from "../utils/axios"
import { UserBody } from "../types/user"

// Ontiene usuarios
export const getUsers = async () => {
  try {

    // const { data } = await apiURL.get('/getUsers')
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

// Obtiene el usuario por id
export const getUser = async (_id: string): Promise<UserBody> => {
  try {

    // const { data } = await apiURL.get(`/getUserById/${_id}`)
    const { data } = await apiURL.get(`user/${_id}`)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al actualizar el usuario')
    
  }
}

// Actualiza el usuario
export const updateUserById = async (_id: string, userData: Partial<UserBody>): Promise<UserBody> => {
  try {

    // const { data } = await apiURL.put(`/updateUser/${_id}`, userData)
    const { data } = await apiURL.put(`user/${_id}`, userData)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al actualizar el usuario')
    
  }
}