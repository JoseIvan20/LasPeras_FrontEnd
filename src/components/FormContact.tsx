import { Contact, Mail, Phone, Send, User2 } from "lucide-react"
import CustomButton from "../components/button/CustomButton"
import pearIcon from '../images/pear-icon.svg'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import MessageToasty from "./messages/MessageToasty"
import useMail from "../hooks/useMail"
import { MailBody } from "../types/mail"
import { MessageError, MessageSuccess } from "./messages/Message"
import { useEffect } from "react"
import AnimatedPearIcon from "../components/animations/AnimatedPearIcon"

const FormContact = () => {

  const { 
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MailBody>()

  const { 
    mailSend,
    isPendingSend,
    successMessage,
    errorMessage,
    isSuccessSend,
    clearMessages
  } = useMail()

  const onSubmit: SubmitHandler<MailBody> = data => {
    mailSend(data)
  }

  useEffect(() => {
    if (isSuccessSend) {
      reset()
      const timer = setTimeout(() => {
        clearMessages()
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isSuccessSend, reset, clearMessages])

  return (
    <div className="relative w-full max-w-lg bg-white px-10 py-5 shadow-lg rounded-lg">
      {successMessage && <MessageSuccess success={successMessage} />}
      {errorMessage && <MessageError error={errorMessage} />}

      <div>
        <div className="mb-10 flex items-center gap-4">
          <Contact className="text-gray-500" />
          <span className="border-b-2 border-gray-500 text-lg text-gray-500 font-bold">
            Formulario de contacto
          </span>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="relative">

          <div>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Coloca un nombre'
              }}
              render={({ field }) => (
                <MessageToasty
                  label="Nombre"
                  type="nombre"
                  placeholder="John Doe"
                  icon={User2}
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mt-5">
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                  message: 'Email inválido'
                }
              }}
              render={({ field }) => (
                <MessageToasty
                  label="Correo electrónico"
                  type="email"
                  icon={Mail}
                  placeholder="example@email.com"
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mt-5">
            <Controller
              name="phone"
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
                  type="phone"
                  icon={Phone}
                  placeholder="55 0000 0000"
                  error={errors.phone?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mt-5">
            <Controller
              name="message"
              control={control}
              rules={{ required: "El mensaje es requerido" }}
              render={({ field }) => (
                <MessageToasty
                  label="Mensaje"
                  type="textarea"
                  error={errors.message?.message}
                  {...field}
                />
              )}
            />
          </div>

          <hr className="mt-10 border-gray-200 border-2" />

          <div className="flex justify-end my-4">
            <CustomButton
              buttonText={`${isPendingSend ? 'Enviando ' : 'Enviar'}`}
              icon={Send}
              type="submit"
              isLoading={isPendingSend}
              disabled={isPendingSend}
              loadingText="Enviando información..." />
          </div>
        </form>

        {/* Pera debajo del formulario */}
        <div className="absolute -right-24 -bottom-20 w-[150px] h-[150px] rotate-90">
          <AnimatedPearIcon
            src={pearIcon}
            alt="Logo Las Peras FormContact"
            className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  )
}

export default FormContact