// hook de usuarios

import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query"
import { addPayment, getPaymentsByPriceId, getPrice, getPrices, updatePriceById } from "../api/PriceAPI"
import { PriceBody } from "../types/price"
import MessageToast from "../components/messages/MessageToast"
import { useCallback, useState } from "react"
import { MailBody, MailResponse } from "../types/mail"
import { sendMail } from "../api/MailAPI"

interface PriceDataProps {
  _id: string
  formData: Partial<PriceBody>
}

interface GetPriceDataProps {
  _id: string
}

export const usePrice = () => {

  const queryClient = useQueryClient()

  // Consulta de cotizaciones
  const priceQuery = useQuery({
    queryKey: ['prices'],
    queryFn: getPrices,
    refetchInterval: 1000,
    retry: 3
  })

  // Consulta de pagos
  const usePaymentQuery = (_id: string) => useQuery({
    queryFn: () => getPaymentsByPriceId(_id),
    queryKey: ['payments'],
    refetchInterval: 1000,
    retry: 3
  })

  // Mutacion que actualiza la cotizacion
  const updateMutation: UseMutationResult<PriceBody, Error, PriceDataProps> = useMutation({
    mutationFn: ({ _id, formData }: PriceDataProps) => updatePriceById(_id, formData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['prices'] })
      MessageToast({ icon: 'success', title: 'Éxitoso', message: `${data.message}` })
    },
    onError: error => {
      MessageToast({ icon: 'error', title: 'Error', message: `${error.message}` })
    }
  })

  // Obtencion de la cotizacion por medio de id
  const priceById = useMutation({
    mutationFn: ({ _id }: GetPriceDataProps) => getPrice(_id),
    onError: error => {
      const messageError = JSON.parse(error.message)
      MessageToast({ icon: 'error', title: 'Error', message: `${messageError.message}` })
    }
  })

  // Agregar cotizacion
  const addPaymentPrice = useMutation({
    mutationFn: ({ _id, amount, method }: { _id: string, amount: number, method: string }) => 
      addPayment(_id, amount, method),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['prices'] })
      MessageToast({ icon: 'success', title: 'Éxitoso', message: `${data.message}` })
    },
    onError: error => {
      const messageError = JSON.parse(error.message)
      console.log(messageError)
      MessageToast({ icon: 'error', title: 'Error', message: `${messageError.error}` })
    }
  })

  // console.log(priceById.data?.status)

  return {
    // Obtencion de usuarios
    prices: priceQuery.data || [],
    isPendingPrice: priceQuery.isPending,
    isErrorPrice: priceQuery.isError,

    // Obtenemos los precios
    usePaymentQuery,

    // Actualizar usuario
    updatePrice: updateMutation.mutate,
    isPendingUpdatePrice: updateMutation.isPending,
    isSuccessUpdatePrice: updateMutation.isSuccess,
    isErrorUpdatePrice: updateMutation.isError,

    getPriceById: priceById.mutateAsync,
    statusById: priceById.data?.status,
    isPendingPriceById: priceById.isPending,
    isErrorPriceById: priceById.isError,

    // Agregar precio
    addPayment: addPaymentPrice.mutate,
    isPendingAddPayment: addPaymentPrice.isPending,
    isSuccessAddPayment: addPaymentPrice.isSuccess,
    isErrorAddPayment: addPaymentPrice.isError
  }
}

// Hook de email
export const useMail = () => {

  const queryClient = useQueryClient()

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const clearMessages = useCallback(() => {
    setSuccessMessage(null)
    setErrorMessage(null)
  }, [])

  const mailMutation = useMutation<MailResponse, Error, MailBody>({
    mutationFn: sendMail,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['prices'] })
      setSuccessMessage(data.message)
      setErrorMessage(null)
    },
    onError: error => {
      const errorParse = JSON.parse(error.message)
      setErrorMessage(errorParse.message)
      setSuccessMessage(null)
    }
  })

  return {
    mailSend: mailMutation.mutate,
    isPendingSend: mailMutation.isPending,
    isSuccessSend: mailMutation.isSuccess,
    isErrorSend: mailMutation.isError,
    successMessage,
    errorMessage,
    clearMessages
  }
}