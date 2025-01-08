import { CommentBody } from "../types/price"
import apiURL from "../utils/axios"
import { handleApiError } from "../helper/errorHandler"

// Agregar comentario
export const addComment = async (commentData: Partial<CommentBody>) => {
  try {

    const { data } = await apiURL.post('/addComment', commentData)
    // const { data } = await apiURL.post('/comment/add-comment', commentData)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Obtener comentarios
export const getComments = async () => {
  try {

    const { data } = await apiURL.get('/getComments')
    // const { data } = await apiURL.get('/comment')
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Actualizar comentario
export const updateComment = async (commentId: string, commentData: Partial<CommentBody>) => {
  try {

    const { data } = await apiURL.put(`/updateComment/${commentId}`, commentData)
    // const { data } = await apiURL.put(`/comment/${commentId}`, commentData)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}

// Eliminar comentario
export const deleteComment = async (commentId: string) => {
  try {

    const { data } = await apiURL.delete(`/deleteComment/${commentId}`)
    // const { data } = await apiURL.delete(`/comment/${commentId}`)
    return data

  } catch (error) {

    throw handleApiError(error)

  }
}