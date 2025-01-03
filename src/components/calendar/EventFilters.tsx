// Archivo que maneja los filtros de eventos, esto por status
import { motion } from 'framer-motion'

interface EventFilter {
  id: string
  label: string
  color: string
}

interface EventFiltersProps {
  filters: EventFilter[]
  selectedFilters: string[]
  onFilterChange: (filterId: string) => void
}

const EventFilters = ({ filters, selectedFilters, onFilterChange }: EventFiltersProps) => {
  return (
    <div className="w-64 bg-white rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3 text-[#444]">Filtros de eventos</h3>
      <div className="space-y-2">
        {filters.map((filter) => (
          <label key={filter.id} className="flex items-center space-x-3 cursor-pointer">
            <motion.div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shadow-md ${
                selectedFilters.includes(filter.id) ? filter.color : 'border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ scale: selectedFilters.includes(filter.id) ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className="w-3 h-3 bg-white rounded-sm"
              />
            </motion.div>
            <input
              type="checkbox"
              checked={selectedFilters.includes(filter.id)}
              onChange={() => onFilterChange(filter.id)}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-600">{filter.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default EventFilters

