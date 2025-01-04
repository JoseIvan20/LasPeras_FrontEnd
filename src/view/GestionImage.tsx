import { ImageBody } from '../types/image'
import { ImageUpIcon, Image, FileImageIcon, XCircle, Save, ImageDownIcon, ImageUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import MessageToasty from '../components/messages/MessageToasty'
import CustomButton from '../components/button/CustomButton'
import useImage from '../hooks/useImage'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import { LabelBadge } from '../components/label/LabelBadge'

const GestionImage = () => {

  // Navegacion
  const navigate = useNavigate()
  // Hook Form
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<ImageBody>()

  // Hook
  const {
    addImage,
    isPendingAdd,
    isSuccessAdd,

    isPendingImages,
    getImages,

    deactivateImage
  } = useImage()

  // Inicio
  const handleHome = () => {
    navigate('/') // Inicio
  }

  // Validacion de extensiones permitidas
  const validateFile = (file: File | null) => {
    if (!file) return 'Selecciona una imagen'
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      return 'Solo se permiten archivos .jpg, .png o .svg'
    }
    return true
  }
  
  const onSubmitAdd = async (data: ImageBody) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('alt', data.alt)
      if (data.file instanceof File) {
        formData.append('image', data.file)
      }

      await addImage(formData)
    } catch (error) {
      console.error('Error en el formulario', error)
    }
  }
  
  useEffect(() => {
    if (isSuccessAdd && !isPendingAdd) {
      reset({
        title: '',
        alt: '',
        file: null,
        fileContent: ''
      })
    }
  }, [isSuccessAdd, isPendingAdd])

  // Función para construir la URL de Cloudinary
  const getCloudinaryUrl = (publicId: string) => {
    return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`
  }

  return (
    <div className="flex flex-col gap-3 md:gap-5 bg-gray-100 mx-2 my-2 md:mx-8 md:my-8">
      <div className="bg-white p-5 m-2 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-3">
          <ImageUpIcon className="text-[#444]" />
          
          <div className='flex flex-col'>
            <h1 className="text-[#444] text-xl font-semibold">
              Gestión de imagenes
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 m-2 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmitAdd)} className="mb-8">
          <Controller
            name="title"
            control={control}
            rules={{
              required: 'Agrega un titulo corto'
            }}
            render={({ field }) => (
              <MessageToasty
                label="Titulo"
                placeholder="Imagen 1"
                icon={Image}
                error={errors.title?.message}
                {...field}
              />
            )}
          />
            
          <Controller
            name="alt"
            control={control}
            rules={{
              required: 'Agrega una descripción a la imagen',
              pattern: {
                value: /^\d{200}$/,
                message: 'Has rebasado el límite de caracteres, el límite es de 200 caracteres'
              }
            }}
            render={({ field }) => (
              <MessageToasty
                label="Descripción"
                placeholder="La imagen pertence al login..."
                type='textarea'
                icon={FileImageIcon}
                error={errors.alt?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="file"
            control={control}
            rules={{ validate: validateFile }}
            render={({ field: { onChange, value, ...field } }) => (
              <MessageToasty
                label="Imagen"
                type='file'
                error={errors.file?.message}
                accept=".jpg,.jpeg,.png,.svg"
                onFileSelect={(file) => {
                  if (file) {
                    onChange(file)
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setValue('fileContent', reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  } else {
                    onChange(null)
                    setValue('fileContent', '')
                  }
                }}
                {...field}
              />
            )}
          />
          <hr className="my-8" />

          <div className="md:flex-row md:justify-end flex gap-3 flex-col justify-center">
            <CustomButton
              buttonText="Cancelar"
              icon={XCircle}
              type="button"
              className="w-full md:w-auto flex justify-center"
              onClick={handleHome}
              />

            <CustomButton
              buttonText="Guardar imagen"
              icon={Save}
              type="submit"
              isLoading={isPendingAdd}
              disabled={isPendingAdd}
              loadingText="Guardando imagen..."
              className="bg-[#444] text-white hover:bg-[#666] w-full md:w-auto flex justify-center items-center" />
          </div>
        </form>
      </div>

      {/* Sección para mostrar las imágenes */}
      <div className="bg-white p-5 m-2 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">Imágenes guardadas</h2>
        {isPendingImages ? (
          <div className="flex justify-center items-center h-28">
            <div className='flex gap-2 items-center bg-white p-3 rounded-md shadow'>
              <Spinner size={30} borderColor='border-red-700'/>
              <span className='text-slate-600 font-semibold'>Cargando imagenes...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getImages?.map(image => (
              <div key={image._id} className="border rounded-md p-4 relative">
                <LabelBadge
                  labelText={image.isActive ? "Activa" : "Inactiva"}
                  variant={image.isActive ? "success" : "error"}
                  className="absolute top-2 right-2 z-10"
                />
                <img 
                  src={getCloudinaryUrl(image.publicId)} 
                  alt={image.alt} 
                  className="w-full h-36 md:h-52 object-cover mb-2 rounded-md" 
                />
                <h3 className="font-bold text-gray-600">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{image.alt}</p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => deactivateImage(image._id)}
                    className={`text-red-500 hover:text-red-600 duration-300 ${image.isActive ? 'opacity-100' : 'opacity-50'}`}
                    aria-label={image.isActive ? "Desactivar imagen" : "Activar imagen"}
                  >
                    {image.isActive ? <ImageDownIcon size={20} /> : <ImageUp size={20} /> }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default GestionImage