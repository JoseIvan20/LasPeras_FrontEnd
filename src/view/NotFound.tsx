import { CornerUpLeft, TriangleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1) // Con esto el usuario puede regresar a la ventana en la que ventana antes de haber navegado a otra
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='pt-10'>
        <h1 className='font-bold text-slate-600 text-8xl'> 404 </h1>
      </div>

      <div className='pt-5'>
        <h3 className='flex items-center gap-3 text-2xl font-semibold text-slate-600'>
          Página no encontrada
          <TriangleAlert className='text-yellow-400' />
        </h3>
      </div>

      <div className='pt-5'>
        <span className='text-slate-700'> No pudimos encontrar la página que estás buscando </span>
      </div>

      <div className='pt-7'>
        <button
          className='bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200 hover:text-red-800 transition-colors font-semibold flex gap-2 items-center'
          onClick={handleGoBack}
        >
          <CornerUpLeft size={16} />
          Regresar
        </button>
      </div>

      <div className='pt-7'>
        <img src="https://serviciosgui-sl.s3.us-east-1.amazonaws.com/media/image-not-found.png" alt="" className='h-96 w-96' />
      </div>
    </div>
  )
}

export default NotFound