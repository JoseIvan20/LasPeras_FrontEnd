import { isAxiosError } from "axios"
import { CommentBody } from "../types/user"
import apiURL from "../utils/axios"

// Agregar comentario
export const addComment = async (commentData: Partial<CommentBody>) => {
  try {

    // const { data } = await apiURL.post('/addComment', commentData)
    const { data } = await apiURL.post('/comment/add-comment', commentData)
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al agregar el comentario')
    
  }
}

// Obtener comentarios
export const getComments = async () => {
  try {

    // const { data } = await apiURL.get('/getComments')
    const { data } = await apiURL.get('/comment')
    return data

  } catch (error) {

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
    }
    throw new Error('Error desconocido al obtener usuarios')
    
  }
}