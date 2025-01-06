import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { Payment, PriceBody } from "../../../types/price"
import { Controller, useForm } from "react-hook-form"
import MessageToasty from "../../../components/messages/MessageToasty"
import { BadgeDollarSign, Calendar, ChevronLeft, Mail, Notebook, NotebookPenIcon, Phone, Save, User2, UserRoundXIcon, UsersRound, XCircle } from "lucide-react"
import { formatDateForInput } from "../../../utils/dateUtils"
import { typeOfEvent } from "../../../utils/typeOfEvent"
import FilterSelect from "../../../components/select/FilterSelect"
import { userContactStatus, UserStatus } from "../../../utils/statusUser"
import CustomButton from "../../../components/button/CustomButton"
import { usePrice } from "../../../hooks/usePrice"
import { paymentMethod } from "../../../utils/paymentMethod"
import { useMediaQuery } from "react-responsive"
import MessageToast from "../../../components/messages/MessageToast"
import { LabelBadge } from "../../../components/label/LabelBadge"
import Spinner from "../../../components/Spinner"

type PaymentStatus = 'pending' | 'partial' | 'complete' | 'canceled'
type BadgeVariant = 'default' | 'warning' | 'info' | 'success' | 'error'

interface PaymentStatusConfig {
  [key: string]: {
    text: string
    variant: BadgeVariant
  }
}

const paymentStatusConfig: PaymentStatusConfig = {
  pending: { text: 'Pendiente', variant: 'warning' },
  partial: { text: 'Parcial', variant: 'info' },
  complete: { text: 'Completado', variant: 'success' },
  canceled: { text: 'Cancelado', variant: 'error' }
}

const PriceEdit = () => {

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [price, setPrice] = useState<PriceBody | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const isMobile = useMediaQuery({ width: 541 }) // Dispositivos mobiles

  const {
    // Actualiza la cotizacion
    updatePrice,
    isPendingUpdatePrice,
    
    // Obtener la cotizacion
    getPriceById,
    isPendingPriceById,
    isErrorPriceById,

    // Consultsr psgos
    usePaymentQuery,

    // Agregar pago
    addPayment
  } = usePrice()

  const { data: paymentData, isLoading: isLoadingPayments } = usePaymentQuery(id || '')

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<PriceBody>({
    defaultValues: {
      name: '',
      email: '',
      phone: 0,
      status: 'pending',
      date: new Date(),
      numberOfPeople: 0,
      typeOfCelebration: '',
      message: '',
      paymentMethod: '',
      totalAmount: 0,
      paidAmount: 0
    },
    disabled: price?.paymentStatus === 'complete'
  })

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const fetchedPrice = await getPriceById({ _id: id })
          setPrice(fetchedPrice)
          // Excluimos paymentMethod y paidAmount del reset
          const { paymentMethod, paidAmount, ...restPrice } = fetchedPrice
          reset(restPrice)
        } catch (err) {
          console.log('Error al obtener la cotizacion', err)
        }
      }
    }
    fetchUser()
  }, [id, getPriceById, reset])

  useEffect(() => {
    if (paymentData) {
      setPayments(paymentData)
    }
  }, [paymentData])

  const onSubmitEdit = async (data: PriceBody) => {
    if (!id) {
      console.error('ID de cotizacion no disponible')
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
        totalAmount
      } = data

      const filteredData = {
        name,
        email,
        phone,
        status: status as UserStatus,
        date: new Date(formatDate),
        numberOfPeople,
        typeOfCelebration,
        message,
        paymentMethod,
        totalAmount
      }

      await updatePrice({
        _id: id,
        formData: filteredData
      })

      navigate('/dashboard/cotizaciones')
    } catch (error) {
      console.log('Ocurrió un error en el formulario', error)
    }
  }

  const handleAddPayment = async () => {
    if (!id) return

    const amount = watch('paidAmount')
    const method = watch('paymentMethod')

    if (!amount || !method) {
      MessageToast({ icon: 'error', title: 'Error', message: 'Monto o método de pago no especificado' })
      return
    }

    if (isNaN(amount)) {
      MessageToast({ icon: 'error', title: 'Error', message: 'El monto debe ser un número válido' })
      return
    }

    try {
      // const data = {
      //   _id: id,
      //   amount: Number(amount),
      //   method
      // }
      // console.log(data)
      await addPayment({
        _id: id,
        amount: Number(amount),
        method
      })
      // Obtenemos la informacion de la cotizacion actual
      const updatedPrice = await getPriceById({ _id: id })
      setPrice(updatedPrice)
      reset({
        ...updatedPrice,
        paymentMethod: '', // Limpiar el método de pago
        paidAmount: 0    // Limpiar el monto
      })
    } catch (error) {
      console.error('Error al agregar el pago', error)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard/cotizaciones')
  }

  if (isErrorPriceById) {
    return (
       <div className="text-center text-red-600 mt-4">
          <h2 className="text-2xl font-bold mb-2">Error al cargar los datos</h2>
          <p> Ocurrio un error </p>
       </div>
    )
  }

  if (isPendingPriceById) { // Es pantalla de carga
    return (
      <div className="flex justify-center items-center h-screen">
        <div className='flex gap-2 items-center bg-white p-3 rounded-md shadow'>
          <Spinner size={30} borderColor='border-red-700'/>
          <span className='text-slate-600 font-semibold'> Cargando cotización </span>
        </div>
      </div>
    )
  }

  if (!price) {
    return (
      <div className="bg-white p-5 m-2 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-3">
          <UserRoundXIcon className="text-red-700" />

          <h1 className="text-red-700 text-xl font-semibold">
            Contización no encontrada
          </h1>
        </div>

        <NavLink to="/dashboard/cotizaciones" className='bg-[#F6F6F6] rounded-md p-1.5 hover:bg-[#444] hover:text-[#F6F6F6] transition-colors'>
          <ChevronLeft />
        </NavLink>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <div className="flex flex-col gap-3 md:gap-5 bg-gray-100 mt-6">
        <div className="bg-white p-5 m-2 md:p-5 md:mx-5 rounded-lg shadow-md flex md:flex-row flex-col justify-between">
          <div className="flex items-center gap-3 mb-8 md:mb-0">
            <Notebook className="text-[#444]" />

            <h1 className="text-[#444] text-xl font-semibold">
              Detalles de cotización
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
              isLoading={isPendingUpdatePrice}
              disabled={isPendingUpdatePrice}
              loadingText="Guardando cambios..."
              className="bg-[#444] text-white hover:bg-[#666]" />
          </div>
        </div>

        <div className="md:p-5 p-2 mb-5">
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
                        disabled={price?.paymentStatus === 'complete'}
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
                        disabled={price?.paymentStatus === 'complete'}
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-gray-600">
                   <div className="p-1.5 bg-gray-100 rounded-lg">
                      <BadgeDollarSign />
                    </div>
                    <h1>Pago</h1>
                  </div>

                  <div className="">
                    <CustomButton
                      buttonText="Agregar pago"
                      icon={BadgeDollarSign}
                      type="button"
                      onClick={handleAddPayment}
                      className="mt-4 bg-[#444] text-white hover:bg-[#666]"
                    />
                  </div>
                </div>

                <hr className="my-5" />

                <div>
                  <div className="flex justify-end my-4">
                    <span className="text-sm text-gray-400 mr-2">Estado de pago: </span>
                    <LabelBadge 
                      variant={paymentStatusConfig[price.paymentStatus as PaymentStatus]?.variant || 'default'} 
                      labelText={paymentStatusConfig[price.paymentStatus as PaymentStatus]?.text || price.paymentStatus} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {price?.totalAmount === undefined ? (
                      <Controller
                        name="totalAmount"
                        control={control}
                        render={({ field }) => (
                          <MessageToasty
                            label="Total a pagar"
                            type="number"
                            icon={BadgeDollarSign}
                            placeholder="Ingrese el total a pagar..."
                            error={errors.totalAmount?.message}
                            {...field}
                          />
                        )}
                      />
                    ): (
                      <>
                        <Controller
                          name="paymentMethod"
                          control={control}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FilterSelect
                              options={paymentMethod}
                              onSelect={onChange}
                              value={value ? String(value) : null}
                              label="Método de pago"
                              disabled={price?.paymentStatus === 'complete'}
                              error={error?.message}
                            />
                          )}
                        />

                        <Controller
                          name="paidAmount"
                          control={control}
                          rules={price.paymentStatus !== 'complete' ? { required: 'El monto es requerido' } : {}}
                          render={({ field }) => (
                            <MessageToasty
                              label="Monto a pagar"
                              type="number"
                              icon={BadgeDollarSign}
                              placeholder="Ingrese el monto..."
                              error={errors.paidAmount?.message}
                              {...field}
                            />
                          )}
                        />
                      
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-3 text-gray-600 flex justify-end">Historial de Pagos</h2>
                  {isLoadingPayments ? (
                    <p>Cargando pagos...</p>
                  ) : payments.length > 0 ? (
                    <ul className="space-y-2">
                      {payments.map((payment, index) => (
                        <li key={index} className="bg-gray-100 p-2 rounded flex justify-end">
                          <span className="font-medium text-gray-600 mr-2">{payment.method}: </span>
                          <span className="text-gray-600"> ${payment.amount} - {new Date(payment.date).toLocaleDateString()} </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="flex text-gray-600 justify-end">No hay pagos registrados.</p>
                  )}
                </div>

                <div className="mt-4 text-gray-500 flex justify-between">
                  <p className="font-semibold">
                    Total a pagar: ${price.totalAmount}
                  </p>
                  <p className="font-semibold">
                    Total Pagado: ${payments.reduce((sum, payment) => sum + payment.amount, 0)}
                  </p>
                </div>
              </div>
            </div>
        </div>

      </div>
    </form>
  )
}

export default PriceEdit