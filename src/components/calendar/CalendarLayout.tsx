import React, { useMemo, useState } from 'react'
import MiniCalendar from './MiniCalendar'
import EventFilters from './EventFilters'
import MainCalendar from './MainCalendar'
import ViewControls from './ViewControls'
import { Menu } from 'lucide-react'
import WeekView from './calendar-view/WeekView'
import ListView from './calendar-view/ListView'
import DayView from './calendar-view/DayView'
import { useUsers } from '../../hooks/useUsers'
import { UserBody } from '../../types/user'
import { parseISO } from 'date-fns'
import MobileSidebar from './responsive/MobileSidebar'

interface Event {
  id: string
  title: string
  date: Date
  status: 'finalized' | 'in_progress'
}

const CalendarLayout: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['finalized', 'in_progress'])
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day' | 'list'>('month')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false) // Modos responsivos

  // Hook de usuario donde obtendremos la fecha
  const {
    users,
    isPendingUsers
  } = useUsers()

  // Convertimos los datos de usuarios a eventos del calendario
  const events = useMemo(() => {
    return users.map((user: UserBody) => {
      const date = parseISO(user.date)
      // Ajustamos la fecha para que se mantenga en el día correcto
      date.setUTCHours(12, 0, 0, 0)
      
      return {
        id: user._id,
        title: user.typeOfCelebration,
        date: date,
        status: user.status,
        client: user.name,
        type: user.typeOfCelebration
      }
    })
  }, [users])

  // Filtros por status
  const filters = [
    { id: 'finalized', label: 'Finalizado', color: 'bg-green-500 border-green-500' },
    { id: 'in_progress', label: 'En Progreso', color: 'bg-sky-500 border-sky-500' },
  ]

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsMobileSidebarOpen(false)
  }

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  // Funcion que obtiene informacion del evento
  const handleEventClick = (event: Event) => {
    console.log('Evento seleccionado:', event)
    // Aquí puedes implementar la lógica para mostrar detalles del evento
  }

  // Filtro de eventos: mes, semana, dia y lista
  // Filtramos los eventos según los filtros seleccionados
  const filteredEvents = useMemo(() => {
    return events.filter((event: Event) => selectedFilters.includes(event.status))
  }, [events, selectedFilters])

  // Renderizacion de eventos
  const renderCalendarView = () => {
    if (isPendingUsers) {
      return <div className="flex items-center justify-center h-full">Cargando eventos...</div>
    }

    switch (currentView) {
      case 'month':
        return <MainCalendar events={filteredEvents} onEventClick={handleEventClick} />
      case 'week':
        return <WeekView currentDate={selectedDate} events={filteredEvents} onEventClick={handleEventClick} />
      case 'day':
        return <DayView currentDate={selectedDate} events={filteredEvents} onEventClick={handleEventClick} />
      case 'list':
        return <ListView currentDate={selectedDate} events={filteredEvents} onEventClick={handleEventClick} />
      default:
        return <MainCalendar events={filteredEvents} onEventClick={handleEventClick} />
    }
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="hidden lg:block w-auto p-4 bg-white mx-5 shadow-md rounded-lg">
        <MiniCalendar onDateSelect={handleDateSelect} />
        <hr />
        <EventFilters
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm mx-4 rounded-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end md:justify-between">
              <h1 className="text-2xl font-bold text-gray-600 md:block hidden">Calendario de Eventos</h1>
              <div className="flex items-center">
                <ViewControls currentView={currentView} onViewChange={setCurrentView} />
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="ml-4 lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#444] duration-300"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          {renderCalendarView()}
        </main>
      </div>

      {/* Sidebar móvil */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        onDateSelect={handleDateSelect}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default CalendarLayout

