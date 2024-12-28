import { useEffect } from "react"
import { UserBody } from "../../types/user"
import FilterSelect from "../../components/select/FilterSelect"
import { formatDateForInput } from "../../utils/dateUtils"
import { typeOfEvent } from "../../utils/typeOfEvent"
import CustomButton from "../../components/button/CustomButton"
import { Calendar, Mail, Phone, Save, User2, UsersRound, XCircle } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useUsers } from "../../hooks/useUsers"
import MessageToasty from "../../components/messages/MessageToasty"
import { userContactStatus, UserStatus } from "../../utils/statusUser"


interface ModalUserProps {
  userSelected: UserBody
  onClose: () => void
}

const ModalUser = ({ userSelected, onClose }: ModalUserProps) => {

  const {
    updateUser,
    isPendingUpdateUser,
  } = useUsers()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UserBody>({
    defaultValues: userSelected
  })

  // Actualizar userData cuando cambie userSelected
  useEffect(() => {
    reset(userSelected)
  }, [userSelected, reset])

  const onSubmitEdit = async (data: UserBody) => {
    try {
      const formatDate = formatDateForInput(data.date)
      const {
        name,
        email,
        phone,
        status,
        numberOfPeople,
        typeOfCelebration,
        message
      } = data
  
      const filteredData = {
        name,
        email,
        phone,
        status: status as UserStatus,
        date: formatDate,
        numberOfPeople,
        typeOfCelebration,
        message
      }
  
      const dataUpdate = {
        _id: userSelected._id.toString(),
        formData: filteredData
      }
  
      await updateUser(dataUpdate)
    } catch (error) {
      console.log('Ocurrió un error en el formulario', error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
        {/* Grid de campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Coloca un nombre'
            }}
            render={({ field }) => (
              <div className="col-span-1">
                <MessageToasty
                  label="Nombre"
                  placeholder="John Doe"
                  icon={User2}
                  error={errors.name?.message}
                  {...field}
                />
              </div>
            )}
          />
        
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
              <div className="col-span-1">
                <MessageToasty
                  label="Correo electrónico"
                  icon={Mail}
                  disabled
                  error={errors.email?.message}
                  {...field}
                />
              </div>
            )}
          />

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
              <div className="col-span-1">
                <MessageToasty
                  label="Teléfono"
                  type="phone"
                  icon={Phone}
                  error={errors.phone?.message}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{ required: 'Elige una fecha' }}
            render={({ field: { onChange, value, ...rest } }) => (
              <div className="col-span-1">
                <MessageToasty
                  label="Fecha tentativa del evento"
                  type="date"
                  icon={Calendar}
                  error={errors.date?.message}
                  value={value ? formatDateForInput(value) : ''}
                  onChange={(e) => {
                    onChange(new Date(e.target.value).toISOString())
                  }}
                  {...rest}
                />
              </div>
            )}
          />
          
          <Controller
            name="numberOfPeople"
            control={control}
            rules={{
              required: 'Elige una cantidad aproximada para tu evento',
              pattern: {
                value: /^\d+$/,
                message: 'No se permite texto'
              } 
            }}
            render={({ field }) => (
              <div className="col-span-1">
                <MessageToasty
                  label="Cantidad de personas"
                  type="number"
                  icon={UsersRound}
                  placeholder="Cantidad de personas"
                  error={errors.numberOfPeople?.message}
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="typeOfCelebration"
            control={control}
            rules={{ required: 'Por favor, selecciona un tipo de evento' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="col-span-1">
                <FilterSelect
                  options={typeOfEvent}
                  onSelect={onChange}
                  value={value ? String(value) : null}
                  label="Tipo de evento"
                  placeholder="Selecciona un tipo de evento"
                  error={error?.message}
                />
              </div>
            )}
          />
          
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Por favor, selecciona un estado' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              const valueToLabel = Object.fromEntries(
                userContactStatus.map(status => [status.value, status.label])
              )
              const labelToValue = Object.fromEntries(
                userContactStatus.map(status => [status.label, status.value])
              )

              return (
                <div className="col-span-1">
                  <FilterSelect
                    options={userContactStatus.map(status => status.label)}
                    onSelect={(selectedLabel) => {
                      const selectedValue = labelToValue[selectedLabel] as UserStatus;
                      onChange(selectedValue);
                    }}
                    value={value ? valueToLabel[value] : null}
                    label="Estado del cliente"
                    placeholder="Selecciona un estado"
                    error={error?.message}
                  />
                </div>
              )
            }}
          />
        </div>

        {/* Mensaje */}
        <div className="col-span-full">
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

        <hr className="my-4 sm:my-6" />

        {/* Botones */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          <CustomButton
            buttonText="Cancelar"
            icon={XCircle}
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto" />

          <CustomButton
            buttonText="Guardar cambios"
            icon={Save}
            type="submit"
            isLoading={isPendingUpdateUser}
            disabled={isPendingUpdateUser}
            loadingText="Guardando cambios..."
            className="w-full sm:w-auto bg-[#444] text-white hover:bg-[#666]" />
        </div>
      </form>
    </div>
  )
}

export default ModalUser