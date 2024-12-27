import { ReactNode } from "react"
import Spinner from "../Spinner"

interface LoadingErrorHandlerProps {
  isLoading: boolean
  isError: boolean
  loadingMessage?: string
  children?: ReactNode
}

const LoadingErrorHandler = ({
  isLoading,
  isError,
  loadingMessage = 'Cargando...',
  children
}: LoadingErrorHandlerProps) => {
  if (isLoading) { // Es pantalla de carga
    return (
      <div className="flex justify-center items-center h-screen">
        <div className='flex gap-2 items-center bg-white p-3 rounded-md shadow'>
          <Spinner size={30} borderColor='border-red-700'/>
          <span className='text-slate-600 font-semibold'>{loadingMessage}</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
       <div className="text-center text-red-600 mt-4">
          <h2 className="text-2xl font-bold mb-2">Error al cargar los datos</h2>
          {/* <p>{isError instanceof Error ? isError.message : 'Ocurrió un error desconocido'}</p> */}
          <p> Ocurrio un error </p>
       </div>
    )
 }

 return children
}

export default LoadingErrorHandler