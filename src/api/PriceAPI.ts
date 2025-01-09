import { handleApiError } from '../helper/errorHandler'
import apiURL from "../utils/axios"
import { Payment, PriceBody } from "../types/price"

// Ontiene usuarios
export const getPrices = async (): Promise<PriceBody[]> => {
  try {

    const { data } = await apiURL.get('/getPrices')
    // const { data } = await apiURL.get('/price')
    return data

  } catch (error) {
    throw handleApiError(error)
  }
}

// Obtiene la cotización por id
export const getPrice = async (_id: string): Promise<PriceBody> => {
  try {

    const { data } = await apiURL.get(`/getPriceById/${_id}`)
    // const { data } = await apiURL.get(`/price/${_id}`)
    return data

  } catch (error) {
    throw handleApiError(error)
  }
}

// Actualiza la cotización
export const updatePriceById = async (_id: string, userData: Partial<PriceBody>): Promise<PriceBody> => {
  try {

    const { data } = await apiURL.put(`/updatePrice/${_id}`, userData)
    // const { data } = await apiURL.put(`price/${_id}`, userData)
    return data

  } catch (error) {
    throw handleApiError(error)
  }
}

// Agregar pago de cotizacion
export const addPayment = async (_id: string, amount: number, method: string): Promise<PriceBody> => {
  try {

    const { data } = await apiURL.post(`/addPayment/${_id}`, { amount, method })
    // const { data } = await apiURL.post(`/price/${_id}/payments`, { amount, method })
    return data
    
  } catch (error) {
    throw handleApiError(error)
  }
}

// Obtención de pagos
export const getPaymentsByPriceId = async (_id: string): Promise<Payment[]> => {
  try {
    const { data } = await apiURL.get(`/getPayments/${_id}`)
    // const { data } = await apiURL.get(`/price/${_id}/payments`)
    return data
  } catch (error) {
    throw handleApiError(error)
  }
}

// Eliminar la cotizacion
export const deletePriceById = async (_id: string): Promise<PriceBody> => {
  try {

    const { data } = await apiURL.delete(`/deletePrice/${_id}`)
    // const { data } = await apiURL.delete(`/price/${_id}`)
    return data

  } catch (error) {
    throw handleApiError(error)
  }
}