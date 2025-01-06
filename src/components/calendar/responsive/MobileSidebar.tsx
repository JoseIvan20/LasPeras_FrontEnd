import React from 'react'
import { X } from 'lucide-react'
import MiniCalendar from '../MiniCalendar'
import EventFilters from '../EventFilters'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  onDateSelect: (date: Date) => void
  filters: Array<{ id: string; label: string; color: string }>
  selectedFilters: string[]
  onFilterChange: (filterId: string) => void
}

const MobileSidebar = ({
  isOpen,
  onClose,
  onDateSelect,
  filters,
  selectedFilters,
  onFilterChange
}: MobileSidebarProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50">
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50">
        <div className="h-full flex flex-col py-6 overflow-y-scroll">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-600">Filtros y Calendario</h2>
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#444] duration-300 p-1.5"
            >
              <span className="sr-only">Cerrar panel</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 relative flex-1 px-4 sm:px-6">
            <MiniCalendar onDateSelect={onDateSelect} />
            <EventFilters
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSidebar

