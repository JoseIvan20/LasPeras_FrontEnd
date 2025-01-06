import { format, addHours, startOfDay, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { Event } from '../../../types/calendar'

interface DayViewProps {
  currentDate: Date
  events: Event[]
  onEventClick: (event: Event) => void
}

const DayView = ({ currentDate, events, onEventClick }: DayViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => addHours(startOfDay(currentDate), i))

  // Filtramos los eventos del día actual
  const todayEvents = events.filter(event => isSameDay(event.date, currentDate))

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold">
          {format(currentDate, 'EEEE, d MMMM yyyy', { locale: es })}
        </h2>
      </div>
      <div className="overflow-y-auto h-[600px]">
        {hours.map((hour) => {
          const hourEvents = todayEvents.filter(
            event => format(event.date, 'HH') === format(hour, 'HH')
          )

          return (
            <div key={hour.toString()} className="flex border-b last:border-b-0">
              <div className="w-20 p-2 text-right text-sm text-gray-500 border-r">
                {format(hour, 'HH:mm')}
              </div>
              <div className="flex-1 p-2">
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`
                      p-2 mb-2 rounded text-sm cursor-pointer
                      ${
                        event.status === 'finalized'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    `}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DayView
