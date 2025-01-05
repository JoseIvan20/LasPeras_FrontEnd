import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addComment, getComments } from "../api/CommentAPI"
import MessageToast from "../components/messages/MessageToast"

// Hook de comentarios
export const useComment = () => {

  const queryClient = useQueryClient()

  const queryComments = useQuery({
    queryFn: getComments,
    queryKey: ['comments'],
    retry: 3
  })

  const commentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data.message}` })
    },
    onError: error => {
      MessageToast({ icon: 'error', title: 'Error', message: `${error.message}` })
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
  }

}