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
    <div className="w-64 bg-white shadow-lg rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3"> Filtro de eventos </h3>
      <div className="space-y-2">
        {filters.map((filter) => (
          <label key={filter.id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.includes(filter.id)}
              onChange={() => onFilterChange(filter.id)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-600">{filter.label}</span>
            <div className={`w-4 h-4 rounded-full ${filter.color}`}></div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default EventFilters

