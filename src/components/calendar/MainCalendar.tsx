import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: Date
  status: 'finalized' | 'in_progress'
}

interface MainCalendarProps {
  events: Event[]
  onEventClick: (event: Event) => void
}

const MainCalendar = ({ events, onEventClick }: MainCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Función para obtener nombre del día responsivo
  const getDayName = (dayName: string) => {
    return (
      <>
        <span className="hidden sm:inline">{dayName}</span>
        <span className="sm:hidden">{dayName.substring(0, 2)}</span>
      </>
    )
  }

  const renderCalendarDays = () => {
    const days = []
    const totalDays = daysInMonth(currentDate)
    const firstDay = firstDayOfMonth(currentDate)

    // Días vacíos al inicio del mes
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className="bg-gray-50 border border-gray-200 min-h-[80px] sm:min-h-[120px]"
        />
      )
    }

    // Días del mes
    for (let i = 1; i <= totalDays; i++) {
      const dayEvents = events.filter(event => 
        event.date.getDate() === i &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      )

      days.push(
        <div 
          key={i} 
          className="bg-white border border-gray-200 p-1 sm:p-2 min-h-[80px] sm:min-h-[120px] overflow-y-auto"
        >
          <div className="font-semibold mb-1 text-sm sm:text-base">{i}</div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className={`
                  text-xs sm:text-sm p-1 rounded cursor-pointer truncate
                  ${event.status === 'finalized' 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-sky-200 text-sky-800'
                  }
                `}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return days
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 sm:p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth} 
          className="p-1 sm:p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <h2 className="text-lg sm:text-2xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          onClick={nextMonth} 
          className="p-1 sm:p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 text-xs sm:text-sm">
            {getDayName(day)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  )
}

export default MainCalendar

