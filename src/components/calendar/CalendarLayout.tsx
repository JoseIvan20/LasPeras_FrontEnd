import React, { useState } from 'react'
import MiniCalendar from './MiniCalendar'
import EventFilters from './EventFilters'
import MainCalendar from './MainCalendar'
import ViewControls from './ViewControls'
import { Calendar1Icon } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: Date
  status: 'finalized' | 'in_progress'
}

const CalendarLayout: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['finalized', 'in_progress'])
  const [currentView, setCurrentView] = useState<'mes' | 'semana' | 'dia' | 'lista'>('mes')

  // Ejemplo de eventos (reemplazar con datos reales)
  const events: Event[] = [
    { id: '1', title: 'Evento 1', date: new Date(2025, 0, 15), status: 'finalized' },
    { id: '2', title: 'Evento 2', date: new Date(2025, 0, 20), status: 'in_progress' },
  ]

  const filters = [
    { id: 'finalized', label: 'Finalizado', color: 'bg-green-500' },
    { id: 'in_progress', label: 'En Progreso', color: 'bg-yellow-500' },
  ]

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const handleEventClick = (event: Event) => {
    console.log('Evento seleccionado:', event)
    // Aquí puedes implementar la lógica para mostrar detalles del evento
  }

  const filteredEvents = events.filter(event => selectedFilters.includes(event.status))

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="w-auto p-4 bg-white mx-5 shadow-md rounded-lg">
        <MiniCalendar onDateSelect={handleDateSelect} />
        <EventFilters
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-600">
            <Calendar1Icon />
            Calendario de Eventos
          </h1>
          <ViewControls currentView={currentView} onViewChange={setCurrentView} />
        </div>
        <MainCalendar events={filteredEvents} onEventClick={handleEventClick} />
      </div>
    </div>
  )
}

export default CalendarLayout

