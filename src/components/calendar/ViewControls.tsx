
type ViewType = 'mes' | 'semana' | 'dia' | 'lista'

interface ViewControlsProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const ViewControls = ({ currentView, onViewChange }: ViewControlsProps) => {
  const views: ViewType[] = ['mes', 'semana', 'dia', 'lista']

  return (
    <div className="flex space-x-2">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 ${
            currentView === view
              ? 'bg-gray-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default ViewControls

