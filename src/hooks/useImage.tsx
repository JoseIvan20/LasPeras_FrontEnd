import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addImage, deactivateImage, getImages } from "../api/ImageAPI"
import MessageToast from "../components/messages/MessageToast"

const useImage = () => {

  const queryClient = useQueryClient()

  // Consulta de imagenes
  const imageQuery = useQuery({
    queryFn: getImages,
    queryKey: ['images'],
    retry: 3
  })

  // Mutacion de imagen. Subir imagen
  const imageAddMutation = useMutation({
    mutationFn: (imageData: FormData) => addImage(imageData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['images'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data?.message}` })
    },
    onError: error => {
      const messageError = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${messageError.error}` })
    }
  })

  // Mutacion de imagen. Desactivar imagen
  const imageDeactivateMutation = useMutation({
    mutationFn: deactivateImage,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['images'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data?.message}` })
    },
    onError: error => {
      const messageError = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${messageError.error}` })
    }
  })

  return {
    // Query de imagenes
    getImages: imageQuery.data || [],
    isPendingImages: imageQuery.isPending,

    addImage: imageAddMutation.mutate,
    isPendingAdd: imageAddMutation.isPending,
    isSuccessAdd: imageAddMutation.isSuccess,

    deactivateImage: imageDeactivateMutation.mutate,
    isPendingDeactive: imageDeactivateMutation.isPending,
    isSuccessgDeactive: imageDeactivateMutation.isSuccess,
  }
}

export default useImage