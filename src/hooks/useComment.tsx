import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addComment, deleteComment, getComments, updateComment } from "../api/CommentAPI"
import MessageToast from "../components/messages/MessageToast"
import { CommentBody } from "../types/price"

interface UpdateCommentDataProps {
  _id: string
  commentData: Partial<CommentBody>,
}

// Hook de comentarios
export const useComment = () => {

  const queryClient = useQueryClient()

  const queryComments = useQuery({
    queryFn: getComments,
    queryKey: ['comments'],
    retry: 3
  })

  // Mutacion de crear comentario
  const commentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data.message}` })
    },
    onError: error => {
      const errorFormat = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${errorFormat.message}` })
    }
  })

  // Mutacion que actualiza el comentario
  const updateCommentMutation = useMutation({
    mutationFn: ({ _id, commentData }: UpdateCommentDataProps) => updateComment(_id, commentData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data.message}` })
    },
    onError: error => {
      const errorFormat = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${errorFormat.message}` })
    }
  })

  // Mutacion que elimina el comentario
  const deleteCommentMutation = useMutation({
    mutationFn: (_id: string) => deleteComment(_id),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: data.message })
    },
    onError: error => {
      const errorFormat = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${errorFormat.message}` })
    }
  })

  return {

    getComments: queryComments.data || [],
    isPendingComments: queryComments.isPending,
    isErrorComments: queryComments.isError,
    isSuccessComments: queryComments.isSuccess,

    // Metodos de agregar comentarios
    addComment: commentMutation.mutate,
    isPendingComment: commentMutation.isPending,
    isErrorComment: commentMutation.isError,
    isSuccessComment: commentMutation.isSuccess,

    // Metodos que actualizan el comentario
    updateComment: updateCommentMutation.mutate,
    isPendingUpdateComment: updateCommentMutation.isPending,
    isErrorUpdateComment: updateCommentMutation.isError,
    isSuccessUpdateComment: updateCommentMutation.isSuccess,

    // Metodos que eliminan el comentario
    deleteComment: deleteCommentMutation.mutate,
    isPendingDeleteComment: deleteCommentMutation.isPending,
    isErrorDeleteComment: deleteCommentMutation.isError,
    isSuccessDeleteComment: deleteCommentMutation.isSuccess
  }

}