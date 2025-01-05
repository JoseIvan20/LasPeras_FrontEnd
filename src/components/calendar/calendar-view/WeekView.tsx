// Componente que maneja los filtros de buisqueda por mes, semana, dia o lista
import { format, startOfWeek, addDays } from 'date-fns'
import { es } from 'date-fns/locale'

interface Event {
  id: string
  title: string
  date: Date
  status: 'finalized' | 'in_progress'
}

interface WeekViewProps {
  currentDate: Date
  events: Event[]
  onEventClick: (event: Event) => void
}

const WeekView = ({ currentDate, events, onEventClick }: WeekViewProps) => {
  const startDate = startOfWeek(currentDate, { locale: es })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Cabecera de días */}
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className="px-4 py-3 text-center border-r last:border-r-0"
          >
            <div className="text-sm font-medium text-gray-500">
              {format(day, 'EEEE', { locale: es })}
            </div>
            <div className="text-lg font-semibold">
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      {/* Contenido del día */}
      <div className="grid grid-cols-7 h-[600px]">
        {weekDays.map((day) => {
          const dayEvents = events.filter(event => 
            format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          )

          return (
            <div
              key={day.toString()}
              className="border-r last:border-r-0 p-2 overflow-y-auto"
            >
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className={`
                    p-2 mb-2 rounded text-sm cursor-pointer
                    ${event.status === 'finalized' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }
                  `}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekView

