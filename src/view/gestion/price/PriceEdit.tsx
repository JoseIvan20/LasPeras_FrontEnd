import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { UserBody } from "../../../types/user"
import { Controller, useForm } from "react-hook-form"
import MessageToasty from "../../../components/messages/MessageToasty"
import { BadgeDollarSign, Calendar, ChevronLeft, Mail, Notebook, NotebookPenIcon, Phone, Save, User2, UserRoundXIcon, UsersRound, XCircle } from "lucide-react"
import { formatDateForInput } from "../../../utils/dateUtils"
import { typeOfEvent } from "../../../utils/typeOfEvent"
import FilterSelect from "../../../components/select/FilterSelect"
import { userContactStatus, UserStatus } from "../../../utils/statusUser"
import CustomButton from "../../../components/button/CustomButton"
import { useUsers } from "../../../hooks/useUsers"
import { paymentMethod } from "../../../utils/paymentMethod"
import { percentage } from "../../../utils/percentage"
import { useMediaQuery } from "react-responsive"

const PriceEdit = () => {

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserBody | null>(null)
  const isMobile = useMediaQuery({ width: 541 }) // Dispositivos mobiles

  const {
    updateUser,
    isPendingUpdateUser,

    getUserById,
    // statusById
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
        message,
        paymentMethod,
        percentage
      } = data

      const filteredData = {
        name,
        email,
        phone,
        status: status as UserStatus,
        date: formatDate,
        numberOfPeople,
        typeOfCelebration,
        message,
        paymentMethod,
        percentage
      }

      await updateUser({
        _id: id,
        formData: filteredData
      })

      navigate('/dashboard/cotizaciones') // Lo llevamos al dashboard
    } catch (error) {
      console.log('Ocurrió un error en el formulario', error)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard/cotizaciones')
  }

  if (!user) {
    return (
      <div className="bg-white p-5 m-2 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-3">
          <UserRoundXIcon className="text-red-700" />

          <h1 className="text-red-700 text-xl font-semibold">
            Contización no encontrado
          </h1>
        </div>

        <NavLink to="/dashboard/cotizaciones" className='bg-[#F6F6F6] rounded-md p-1.5 hover:bg-[#444] hover:text-[#F6F6F6] transition-colors'>
          <ChevronLeft />
        </NavLink>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 md:gap-5 bg-gray-100 mt-6">
      <div className="bg-white p-5 m-2 md:p-5 md:mx-5 rounded-lg shadow-md flex md:flex-row flex-col justify-between">
        <div className="flex items-center gap-3 mb-8 md:mb-0">
          <Notebook className="text-[#444]" />

          <h1 className="text-[#444] text-xl font-semibold">
            Detalles de contización
          </h1>
        </div>

        <div className={`flex gap-4 ${isMobile ? 'justify-center' : 'justify-end'} flex-col md:flex-row`}>
          <CustomButton
            buttonText="Cancelar"
            icon={XCircle}
            type="button"
            className={``}
            onClick={handleCancel}
          />

          <CustomButton
            buttonText="Guardar cambios"
            icon={Save}
            type="submit"
            isLoading={isPendingUpdateUser}
            disabled={isPendingUpdateUser}
            loadingText="Guardando cambios..."
            className="bg-[#444] text-white hover:bg-[#666]" />
        </div>
      </div>

      <div className="md:p-5 p-2 mb-5">
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          {/* <CustomInput */}
          <div>

            <div className="bg-white p-4 rounded-md shadow-lg">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-1.5 bg-gray-100 rounded-lg">
                  <NotebookPenIcon />
                </div>
                <h1> Información general </h1>
              </div>

              <hr className="my-5" />

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

            <div className="bg-white p-4 rounded-md shadow-lg mt-10">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-1.5 bg-gray-100 rounded-lg">
                  <BadgeDollarSign />
                </div>
                <h1> Pago </h1>
              </div>

              <hr className="my-5" />

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FilterSelect
                      options={paymentMethod}
                      onSelect={onChange}
                      value={value ? String(value) : null}
                      label="Método de pago"
                      error={error?.message}
                    />
                  )}
                />

                <Controller
                  name="percentage"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FilterSelect
                      options={percentage}
                      onSelect={onChange}
                      value={value ? String(value) : null}
                      label="Pagado(Porcentaje)"
                      error={error?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default PriceEdit