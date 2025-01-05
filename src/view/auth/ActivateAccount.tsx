import { Controller, useForm } from "react-hook-form"
import { ConfirmUserBody } from "../../types/admin"
import useAuth from "../../hooks/useAuth"
import MessageToasty from "../../components/messages/MessageToasty"
import { Hand, MailOpen, Send } from "lucide-react"
import CustomButton from "../../components/button/CustomButton"
import VerificationCodeInput from "../../components/input/VerificationCodeInput"
import { useEffect, useState } from "react"

const ActivateAccount = () => {

  const [isCodeExpired, setIsCodeExpired] = useState(false)
  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm<ConfirmUserBody>()

  const {
    confirmAccount,
    isPendingConfirmAccount,

    resendConfirmAccount,
    isPendingResend,
    confirmAccountError,
    isErrorConfirmAccount,
    isSuccessConfirmAccount
  } = useAuth()

  useEffect(() => {
    if (isErrorConfirmAccount && confirmAccountError instanceof Error) {
      try {
        const errorData = JSON.parse(confirmAccountError.message)
        if (errorData.status === 'expired') {
          setIsCodeExpired(true)
        }
      } catch (e) {
        console.error('Error al parsear el mensaje de error:', e)
      }
    }
  }, [isErrorConfirmAccount, confirmAccountError])

  // Confirmacion de cuenta
  const onSubmitConfirmation = async (dataConfirm: ConfirmUserBody) => {
    await confirmAccount(dataConfirm)
  }

  const handleResendCode = async () => {
    try {
      await resendConfirmAccount({ 
        consumer: getValues('consumer'),
        confirmationCode: '' 
      })
      setIsCodeExpired(false)
    } catch (error) {
      console.error('Error al reenviar el código', error)
    }
  }

  // Efecto para limpiar el formulario después de un envío exitoso o error
  useEffect(() => {
    if (isSuccessConfirmAccount || isErrorConfirmAccount) {
      reset({
        consumer: '',
        confirmationCode: ''
      })
    }
  }, [isSuccessConfirmAccount, isErrorConfirmAccount, reset])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3">
      <div className="w-full max-w-xl md:w-1/2 bg-white py-14 px-8 rounded-xl shadow-md">

        <div className="flex items-center gap-3 justify-center mb-10 mt-5">
          <img src="https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/yavwqfubik47qtv4w6po.png" alt="Las peras en Login" className="w-20 h-20" />

          <span className="text-2xl font-semibold text-gray-600">Confirmación de cuenta</span>
        </div>

        <form onSubmit={handleSubmit(onSubmitConfirmation)}>
          <div>
            <span className="text-gray-600 text-xl text-center"> Ingresa el código que recibiste en tú <span className="font-semibold text-[#444]"> correo electronico </span> </span>
          </div>

          <div className="mt-10">
            <Controller
              name="consumer"
              control={control}
              rules={{
                required: 'Coloca un correo electronico'
              }}
              render={({ field }) => (
                <MessageToasty
                  label="Correo electrónico"
                  type="email"
                  placeholder="example@gmail.com"
                  icon={MailOpen}
                  error={errors.consumer?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mt-8">
            <Controller
              name="confirmationCode"
              control={control}
              rules={{
                required: 'El código de verificación es requerido',
                validate: (value) => value.length === 6 || 'El código debe tener 6 dígitos'
              }}
              render={({ field }) => (
                <VerificationCodeInput
                  onChange={code => {
                    setValue('confirmationCode', code);
                    field.onChange(code);
                  }}
                  error={errors.confirmationCode?.message}
                />
              )}
            />
          </div>

          <div className="flex justify-center pt-10 flex-col gap-5">
            <CustomButton
              buttonText="Validar"
              icon={Hand}
              type="submit"
              isLoading={isPendingConfirmAccount}
              disabled={isPendingConfirmAccount || isCodeExpired}
              loadingText="Validando..."
              className="bg-[#444] text-white hover:bg-[#666] w-full justify-center" />
            
            <CustomButton
              buttonText="Reenviar código"
              icon={Send}
              type="submit"
              onClick={handleResendCode}
              isLoading={isPendingResend}
              disabled={isPendingResend || !isCodeExpired}
              loadingText="Reenviando..."
              className="flex justify-center" />
          </div>
        </form>
      
      </div>
    </div>
  )
}

export default ActivateAccount