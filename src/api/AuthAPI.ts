import { AuthBody } from "../types/price"
import apiURL from "../utils/axios"
import { AdminBody, ConfirmUserBody } from "../types/admin"
import { handleApiError } from "../helper/errorHandler"

// Inicio de sesion de administrador
export const authenticated = async (authData: Partial<AuthBody>): Promise<AuthBody> => {
  try {

    const { data } = await apiURL.post('/loginUser', authData)
    // const { data } = await apiURL.post('/auth/login', authData)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Creacion de administrador
export const createAdmin = async (authData: Partial<AdminBody>): Promise<AdminBody> => {
  try {

    const { data } = await apiURL.post('/createAdmin', authData)
    // const { data } = await apiURL.post('/auth/create-user', authData)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Obtencion de administradores
export const getAdmins = async () => {
  try {

    const { data } = await apiURL.get('/getAdmins')
    // const { data } = await apiURL.get('/auth')
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Obtencion de admin por id
export const getAdminById = async (_id: string): Promise<AdminBody> => {
  try {

    const { data } = await apiURL.get(`/getAdminById/${_id}`)
    // const { data } = await apiURL.get(`/auth/${_id}`)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Actualizacion de admin
export const updateAdminById = async (_id: string, formData: Partial<AdminBody>): Promise<AdminBody> => {
  try {

    const { data } = await apiURL.put(`/updateAdmin/${_id}`, formData)
    // const { data } = await apiURL.put(`/auth/update-user/${_id}`, formData)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Baja - Alta de usuario
export const toggleUserStatus = async (_id: string, active: number): Promise<AdminBody> => {
  try {

    const { data } = await apiURL.put(`/deactiveAdmin/${_id}`, { active })
    // const { data } = await apiURL.put(`/auth/deactive-user/${_id}`, { active })
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Confirmacion de cuenta
export const confirmAccount = async (formData: Partial<ConfirmUserBody>) => {
  try {
    const { data } = await apiURL.post('/confirmAccount', formData)
    // const { data } = await apiURL.post('/auth/confirm-user', formData)
    return data
  } catch (error) {

    throw handleApiError(error)

  }
}

// Reenvio de codigo
export const resendConfirmationCode = async (formData: Partial<ConfirmUserBody>) => {
  try {
    const { data } = await apiURL.post('/resendConfirmationCode', formData)
    // const { data } = await apiURL.post('/auth/resend-confirmation', formData)
    return data
  } catch (error) {

    throw handleApiError(error)

  }
}

// Eliminar usuario
export const deleteUser = async (_id: string) => {
  try {
    const { data } = await apiURL.delete(`/deleteUser/${_id}`)
    // const { data } = await apiURL.delete(`/auth/delete-user/${_id}`)
    return data
  } catch (error) {

    throw handleApiError(error)

  }
}