import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { UserBody } from "../../types/user"
import { Controller, useForm } from "react-hook-form"
import MessageToasty from "../../components/messages/MessageToasty"
import { Calendar, ChevronLeft, Mail, Phone, Save, User2, UserCircle2, UserRoundXIcon, UsersRound, XCircle } from "lucide-react"
import { formatDateForInput } from "../../utils/dateUtils"
import { typeOfEvent } from "../../utils/typeOfEvent"
import FilterSelect from "../../components/select/FilterSelect"
import { userContactStatus, UserStatus } from "../../utils/statusUser"
import CustomButton from "../../components/button/CustomButton"
import { useUsers } from "../../hooks/useUsers"

const UserEdit = () => {

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserBody | null>(null)

  const {
    updateUser,
    isPendingUpdateUser,

    getUserById
  } = useUsers()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UserBody>()

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const fetchedUser = await getUserById({ _id: id })
          setUser(fetchedUser)
          reset(fetchedUser)
        } catch (err) {
          console.log('Error al obtener el usuario', err)
        }
      }
    }
    fetchUser()
  }, [id, getUserById])

  const onSubmitEdit = async (data: UserBody) => {

    if (!id) {
      console.error('ID de usuario no disponible')
      return
    }

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
  
      await updateUser({
        _id: id,
        formData: filteredData
      })

      navigate('/dashboard') // Lo llevamos al dashboard
    } catch (error) {
      console.log('Ocurrió un error en el formulario', error)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard')
  }

  if (!user) {
    return (
      <div className="bg-white p-5 m-2 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-3">
          <UserRoundXIcon className="text-red-700" />
          
          <h1 className="text-red-700 text-xl font-semibold">
            Usuario no encontrado
          </h1>
        </div>

        <NavLink to="/dashboard" className='bg-[#F6F6F6] rounded-md p-1.5 hover:bg-[#444] hover:text-[#F6F6F6] transition-colors'>
          <ChevronLeft />
        </NavLink>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 md:gap-5 bg-gray-100 mt-6">
      <div className="bg-white p-5 m-2 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-3">
          <UserCircle2 className="text-[#444]" />
          
          <h1 className="text-[#444] text-xl font-semibold">
            Edición de usuario
          </h1>
        </div>

        <NavLink to="/dashboard" className='bg-[#F6F6F6] rounded-md p-1.5 hover:bg-[#444] hover:text-[#F6F6F6] transition-colors'>
          <ChevronLeft />
        </NavLink>
      </div>

      <div className="bg-white p-5 m-2 md:m-20 rounded-lg shadow-lg">  
        <form onSubmit={handleSubmit(onSubmitEdit)}>
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
                  error={errors.name?.message}
                  {...field}
                />
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
                <MessageToasty
                  label="Correo electrónico"
                  icon={Mail}
                  disabled
                  error={errors.email?.message}
                  {...field}
                />
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
                <MessageToasty
                  label="Teléfono"
                  type="phone"
                  icon={Phone}
                  error={errors.phone?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              rules={{ required: 'Elige una fecha' }}
              render={({ field: { onChange, value, ...rest } }) => (
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
                <MessageToasty
                  label="Cantidad de personas"
                  type="number"
                  icon={UsersRound}
                  placeholder="Cantidad de personas"
                  error={errors.numberOfPeople?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="typeOfCelebration"
              control={control}
              rules={{ required: 'Por favor, selecciona un tipo de evento' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FilterSelect
                  options={typeOfEvent}
                  onSelect={onChange}
                  value={value ? String(value) : null}
                  label="Tipo de evento"
                  placeholder="Selecciona un tipo de evento"
                  error={error?.message}
                />
              )}
            />
            
            <Controller
              name="status"
              control={control}
              rules={{ required: 'Por favor, selecciona un estado' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {

                // Creamos un objeto para mapear los valores a las etiquetas
                const valueToLabel = Object.fromEntries(
                  userContactStatus.map(status => [status.value, status.label])
                )

                // Creamos un objeto para mapear las etiquetas de los valores
                const labelToValue = Object.fromEntries(
                  userContactStatus.map(status => [status.label, status.value])
                )

                return (
                  <FilterSelect
                    options={userContactStatus.map(status => status.label)}
                    onSelect={(selectedLabel) => {
                      // Convertimos la etiqueta seleccionada al valor correspondiente
                      const selectedValue = labelToValue[selectedLabel] as UserStatus
                      onChange(selectedValue);
                    }}
                    value={value ? valueToLabel[value] : null}
                    label="Estado del cliente"
                    placeholder="Selecciona un estado"
                    error={error?.message}
                  />
                )
              }}
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

          <hr className="my-8" />

          <div className="md:flex md:justify-end gap-3 flex items-center flex-col">
            <CustomButton
              buttonText="Cancelar"
              icon={XCircle}
              type="button"
              className="w-full md:w-auto flex justify-center"
              onClick={handleCancel}
              />

            <CustomButton
              buttonText="Guardar cambios"
              icon={Save}
              type="submit"
              isLoading={isPendingUpdateUser}
              disabled={isPendingUpdateUser}
              loadingText="Guardando cambios..."
              className="bg-[#444] text-white hover:bg-[#666] w-full md:w-auto flex justify-center" />
          </div>
        </form>
      </div>

    </div>
  )
}

export default UserEdit