import { isAxiosError } from "axios"
import apiURL from "../utils/axios"
import { ImageBody } from "../types/image"

// Agregar imagen
export const addImage = async (imageData: FormData): Promise<ImageBody | null> => {
  try {

    // const { data } = await apiURL.post<ImageBody>('/createImage', imageData)
    const { data } = await apiURL.post<ImageBody>('/image/add-image', imageData)
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage = error?.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw error
  }
}

// Agregar comentario
export const getImages = async (): Promise<ImageBody[] | null> => {
  try {

    // const { data } = await apiURL.get<ImageBody[]>('/getImages')
    const { data } = await apiURL.get<ImageBody[]>('/image')
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage = error?.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw error
  }
}

// Obtiene la imagen por id
export const deactivateImage = async (id: string): Promise<ImageBody | null> => {
  try {

    // const { data } = await apiURL.put<ImageBody>(`/deactiveImage/${id}`)
    const { data } = await apiURL.put<ImageBody>(`/image/deactive-image/${id}`)
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage = error?.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw error
  }
}