import { XCircle } from 'lucide-react'

interface ModalDetailsProps<TData> {
  data: TData
  onClose: () => void
}

const ModalDetails = <TData extends Record<string, any>>({ data, onClose }: ModalDetailsProps<TData>) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Detalles</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-500">{key}</p>
              <p className="font-medium">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModalDetails

