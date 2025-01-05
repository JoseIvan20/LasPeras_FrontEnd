import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Event } from '../../../types/calendar'

interface ListViewProps {
  currentDate: Date
  events: Event[]
  onEventClick: (event: Event) => void
}

const ListView = ({ currentDate, events, onEventClick }: ListViewProps) => {
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold">
          Eventos para {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h2>
      </div>
      <div className="overflow-y-auto h-[600px]">
        {sortedEvents.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No hay eventos programados.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortedEvents.map((event) => (
              <li
                key={event.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onEventClick(event)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {format(event.date, 'EEEE, d MMMM yyyy HH:mm', { locale: es })}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.status === 'finalized'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {event.status === 'finalized' ? 'Finalizado' : 'En Progreso'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ListView

