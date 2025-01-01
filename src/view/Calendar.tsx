import { CornerUpLeft, TriangleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CalendarLayout from '../components/calendar/CalendarLayout'

const Calendar = () => {

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

      <CalendarLayout />
      
    </div>
  )
}

export default Calendar