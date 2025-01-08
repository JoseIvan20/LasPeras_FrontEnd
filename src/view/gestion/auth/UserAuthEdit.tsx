import { Controller, useForm } from "react-hook-form"
import useAuth from "../../../hooks/useAuth"
import { AdminBody } from "../../../types/admin"
import { useEffect, useState } from "react"
import MessageToasty from "../../../components/messages/MessageToasty"
import { LucideLockKeyhole, Mail, Save, User2, XCircle } from "lucide-react"
import CustomButton from "../../../components/button/CustomButton"
import CustomSwitch from "../../../components/switch/CustomSwitch"

interface UserAuthEditProps {
  adminSelected: AdminBody | null
  onClose: () => void
}

const UserAuthEdit = ({ adminSelected, onClose }: UserAuthEditProps) => {

  const [isActive, setIsActive] = useState(adminSelected?.active === 1)

  const {
    // Crear usuario
    createAdmin,
    isPendingCreateAdmin,
    isSuccessCreateAdmin,

    // Actualizar informacion
    updateAdmin,
    isPendingUpdateAdmin,
    isSuccessUpdateAdmin,

    // Cambiar status
    toggleStatus,
    isPendingToggleStatus,
    // isSuccessToggleStatus
  } = useAuth()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<AdminBody>({
    defaultValues: {
      // Solo incluir checkpoint si es un nuevo usuario
      name: adminSelected?.name || '',
      consumer: adminSelected?.consumer || '',
      checkpoint: '', // Siempre iniciar vacío
      rol: adminSelected?.rol || 1,
      active: adminSelected?.active || 1
    }
  })

  // Actualizar userData cuando cambie adminSelected
  useEffect(() => {
    reset({
      name: adminSelected?.name || '',
      consumer: adminSelected?.consumer || '',
      checkpoint: '', // Siempre mantener vacío al resetear
      rol: adminSelected?.rol || 1,
      active: adminSelected?.active || 0
    })
  }, [adminSelected, reset])

  useEffect(() => {
    if ((isSuccessUpdateAdmin && !isPendingUpdateAdmin) || 
        (isSuccessCreateAdmin && !isPendingCreateAdmin)) {
      onClose()
    }
  }, [isSuccessUpdateAdmin, isPendingUpdateAdmin, isSuccessCreateAdmin, isPendingCreateAdmin, onClose])

  // Actuliza el estado active cuando adminSelected cambia
  useEffect(() => {
    setIsActive(adminSelected?.active === 1)
  }, [adminSelected])

  const onSubmit = async (data: AdminBody) => {
    try {
      const {
        name,
        consumer,
        checkpoint,
      } = data

      const filteredData = {
        name,
        consumer,
        ...(checkpoint && { checkpoint }),
      }

      if (adminSelected) {
        await updateAdmin({
          _id: adminSelected._id.toString(),
          formData: filteredData
        })
      } else {
        await createAdmin(filteredData)
      }
    } catch (error) {
      console.log('Ocurrió un error en el formulario', error)
    }
  }

  // Funcion para dar de baja o alta el usuario
  const handleToggleUserStatus = async (checked: boolean) => {
    if (adminSelected) {
      try {
        await toggleStatus({
          _id: adminSelected._id,
          active: checked ? 1 : 0
        })
        setIsActive(checked)
      } catch (error) {
        setIsActive(!checked)
        console.log('Ocurrió un error al cambiar el estado del usuario', error)
      }
    }
  }

  const isFieldDisabled = () => {
    // Si es un usuario nuevo (adminSelected es null), retornar false
    // Si es un usuario existente, retornar true solo si está inactivo
    return adminSelected ? !isActive : false
  }

  return (
    <div className="flex flex-col gap-3 md:gap-5">

      <div className="flex justify-end text-gray-600">
        {adminSelected && (
          <div className="mt-4">
            <CustomSwitch
              color="primary"
              checked={isActive}
              onChange={handleToggleUserStatus}
              label={checked => `${checked ? 'Activo' : 'Inactivo'}`}
              disabled={isPendingToggleStatus}
            />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <CustomInput */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Coloca un nombre'
            }}
            render={({ field }) => (
              <MessageToasty
                label="Nombre"
                placeholder="John Doe"
                icon={User2}
                disabled={isFieldDisabled()}
                error={errors.name?.message}
                {...field}
              />
            )}
          />
        
          <Controller
            name="consumer"
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
                icon={Mail}
                disabled={isFieldDisabled()}
                placeholder="john.doe@example.com"
                error={errors.consumer?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="checkpoint"
            control={control}
            rules={{
              required: 'La contraseña es requerida',
              pattern: {
                value: /^(?!.*(?:123|abc|def))(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
                message: "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número, un carácter especial y no contener secuencias como 123, abc o def"
              }
            }}
            render={({ field }) => (
              <MessageToasty
                label={adminSelected ? "Contraseña nueva" : "Contraseña"}
                type="password"
                disabled={isFieldDisabled()}
                icon={LucideLockKeyhole}
                placeholder={adminSelected ? "Ingrese nueva contraseña" : "Ingrese una contraseña"}
                error={errors.checkpoint?.message}
                {...field}
              />
            )}
          />
        </div>

        <hr className="my-8" />

        <div className="flex justify-end gap-3">
          <CustomButton
            buttonText="Cancelar"
            icon={XCircle}
            type="button"
            onClick={onClose} />

          <CustomButton
            buttonText="Guardar"
            icon={Save}
            type="submit"
            isLoading={isPendingUpdateAdmin || isPendingCreateAdmin}
            disabled={isPendingUpdateAdmin || isPendingCreateAdmin}
            loadingText="Guardando..."
            className="bg-[#444] text-white hover:bg-[#666]"
          />
        </div>
      </form>
    </div>
  )
}

export default UserAuthEdit