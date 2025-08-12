import { MessageSquareMore, Phone, Save, Text } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { WhatsAppBody } from "../types/whatsapp"
import useWhatsApp from "../hooks/useWhatsApp"
import Spinner from "../components/Spinner"
import CustomButton from "../components/button/CustomButton"
import MessageToasty from "../components/messages/MessageToasty"
import CustomSwitch from "../components/switch/CustomSwitch"
import { useEffect, useState } from "react"
import { getConfigWhats } from "../api/WhatsAppAPI"

const SettingsPage = () => {

  // Otro numero: 5517430604

  // Obtencion de la config de WhatsApp
  const { 
    getConfig, 
    isPendingWhats,

    createOrUpdateConfig,
    isPendingCreateOrUpdate,
    isSuccessCreateOrUpdate
  } = useWhatsApp()

  const [isActive, setIsActive] = useState(false)
  const [config, setConfig] = useState<WhatsAppBody | null>(null)
  console.log(config)

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<WhatsAppBody>({
    defaultValues: {
      phoneNumber: '',
      isActive: false,
      defaultMessage: ''
    }
  })

  // Funcion que crea o actualiza la config de WhatsApp
  const handleCreateOrUpdate = async (whatsData: WhatsAppBody) => {
    try {
      await createOrUpdateConfig({ whatsData })
      console.log({
        whatsData,
        isActive: isActive
      })
      // console.log(whatsData)
    } catch (error) {
      console.log('Error en formulario: ', error)
    }
  }

  // Manejo del Switch
  useEffect(() => {
    if (getConfig && typeof getConfig.isActive === 'boolean') {
      setIsActive(getConfig.isActive)
      setValue('isActive', getConfig.isActive)
    }
  }, [getConfig])

  // Toma la informacion de la config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getConfigWhats()
        reset({
          phoneNumber: config.phoneNumber || '',
          defaultMessage: config.defaultMessage || '',
          isActive: config.isActive || false
        })
        setIsActive(config.isActive || false)
      } catch (error) {
        console.log('Error al obtener la configuración de WhatsApp', error)
      }
    }
    fetchConfig()
  }, [getConfig, reset])

  // Actualiza la informacion guardada
  useEffect(() => {
    const updateConfigData = async () => {
      if (isSuccessCreateOrUpdate && !isPendingCreateOrUpdate) {
        try {
          const updatedConfig = await getConfigWhats()
          setConfig(updatedConfig)

          // Actualizar el formulario con los nuevos datos
          reset({
            ...updatedConfig
          })
          setIsActive(updatedConfig.isActive || false)
        } catch (error) {
          console.error('Error al actualizar los datos:', error)
        }
      }
    }
  
    updateConfigData()
  }, [isSuccessCreateOrUpdate, isPendingCreateOrUpdate, getConfigWhats, setConfig, reset])

  // Pantalla de carga
  if (isPendingWhats) { // Es pantalla de carga
    return (
      <div className="flex justify-center items-center h-screen">
        <div className='flex gap-2 items-center bg-white p-3 rounded-md shadow'>
          <Spinner size={30} borderColor='border-red-700'/>
          <span className='text-slate-600 font-semibold'> Cargando configuración... </span>
        </div>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit(handleCreateOrUpdate)}>
      <div className="mx-5 bg-white shadow-md rounded-md p-5">
        <div className="flex justify-between items-center">
          <div className="text-gray-600 flex items-center gap-3">
            <div className="bg-gray-100 p-1 rounded-md">
              <MessageSquareMore />
            </div>

            <h1 className="text-xl font-semibold"> Configuración de WhatsApp </h1>
          </div>

          <div>
            <CustomButton
              buttonText="Guardar"
              icon={Save}
              loadingText="Guardando información..."
              isLoading={isPendingCreateOrUpdate}
              disabled={isPendingCreateOrUpdate}
              type="submit"
            />
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-end mb-7">
          <CustomSwitch
            color="primary"
            checked={isActive}
            onChange={checked => {
              setIsActive(checked)
              setValue('isActive', checked)
            }}
            label={checked => `${checked ? 'Activo' : 'Inactivo'}`}
            disabled={isPendingCreateOrUpdate}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: 'Coloca un teléfono',
              pattern: {
                value: /^\d{10}$/,
                message: 'El teléfono debe ser de 10 dígitos'
              }
            }}
            render={({ field }) => (
              <MessageToasty
                label="Teléfono"
                type="number"
                icon={Phone}
                placeholder="5500000000"
                error={errors.phoneNumber?.message}
                {...field}
              />
            )}
          />
          
          <Controller
            name="defaultMessage"
            control={control}
            rules={{
              pattern: {
                value: /^.{1,50}$/,
                message: 'Has rebasado el límite de caracteres, el límite es de 50 caracteres'
              }
            }}
            render={({ field }) => (
              <MessageToasty
                label="Mensaje de por defecto"
                placeholder="Agrega un saludo/mensaje..."
                type='textarea'
                icon={Text}
                error={errors.defaultMessage?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
    </form>
  )
}

export default SettingsPage