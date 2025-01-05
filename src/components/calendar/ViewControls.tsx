// Componente donde podremos filtrar por mes, semana, dia y lista
type ViewType = 'month' | 'week' | 'day' | 'list'

interface ViewControlsProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const ViewControls = ({ currentView, onViewChange }: ViewControlsProps) => {
  const views: Array<{ type: ViewType; label: string; shortLabel: string }> = [
    { type: 'month', label: 'Mes', shortLabel: 'M' },
    { type: 'week', label: 'Semana', shortLabel: 'S' },
    { type: 'day', label: 'Día', shortLabel: 'D' },
    { type: 'list', label: 'Lista', shortLabel: 'L' }
  ]

  return (
    <div className="flex space-x-1">
      {views.map(({ type, label, shortLabel }) => (
        <button
          key={type}
          onClick={() => onViewChange(type)}
          className={`
            px-2 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${currentView === type 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{shortLabel}</span>
        </button>
      ))}
    </div>
  )
}

export default ViewControls

