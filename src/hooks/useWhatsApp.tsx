import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createOrUpdateConfig, getConfigWhats } from "../api/WhatsAppAPI"
import { WhatsAppBody } from "../types/whatsapp"
import MessageToast from "../components/messages/MessageToast"

interface ConfigDataProps {
  whatsData: Partial<WhatsAppBody>,
}

const useWhatsApp = () => {

  const queryClient = useQueryClient()
  
  // Query de config
  const whatsappQuery = useQuery({
    queryFn: getConfigWhats,
    queryKey: ['whatsapp'],
    refetchInterval: 1000,
    retry: 3
  })

  // Mutacion de creacion o actualizacion de config
  const createOrUpdateMutation = useMutation({
    mutationFn: ({ whatsData }: ConfigDataProps) => createOrUpdateConfig(whatsData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp'] })
      MessageToast({ icon: 'success', title: 'Éxito', message: `${data.message}` })
    },
    onError: error => {
      const errorFormat = JSON.parse(error.message)
      MessageToast({ icon: 'success', title: 'Éxito', message: `${errorFormat.message}` })
    }
  })
  
  return {

    // Obtencion de la informacion de la config
    getConfig: whatsappQuery.data,
    isPendingWhats: whatsappQuery.isPending,
    isErrorWhats: whatsappQuery.isError,

    // Creacion - Actualizacion de config
    createOrUpdateConfig: createOrUpdateMutation.mutate,
    isPendingCreateOrUpdate: createOrUpdateMutation.isPending,
    isErrorCreateOrUpdate: createOrUpdateMutation.isError,
    isSuccessCreateOrUpdate: createOrUpdateMutation.isSuccess,

  }
}

export default useWhatsApp