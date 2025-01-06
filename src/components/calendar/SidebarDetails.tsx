import { AppWindow, Calendar1Icon, Notebook, TicketSlashIcon, UserRoundCogIcon, X } from 'lucide-react'
import { Event } from '../../types/calendar'
import { AnimatePresence, motion } from 'framer-motion'
import { LabelBadge } from '../label/LabelBadge'

interface SidebarDetailsProps {
  event: Event | null
  onClose: () => void
}

const SidebarDetails = ({ event, onClose }: SidebarDetailsProps) => {

  if (!event) return null

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 15 }}
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-600 flex flex-row items-center gap-3">
              <div className='p-1 bg-gray-100 rounded-md'>
                <Notebook className='text-gray-600' />
              </div>
              Detalles del Evento
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="space-y-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Estado</h3>
              {event.status === 'finalized' ? (
                <LabelBadge variant='success' labelText='Finalizado' />
              ): (
                <LabelBadge variant='warning' labelText='En proceso' />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 flex items-center gap-3">
                <div className='pt-1 bg-gray-100 rounded-md'>
                  <UserRoundCogIcon size={20} />
                </div>
                Cliente
              </h3>
              <p className="text-gray-900">{event.client}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 flex items-center gap-3">
                <div className='pt-1 bg-gray-100 rounded-md'>
                  <TicketSlashIcon size={20} />
                </div>
                Título
              </h3>
              <p className="text-gray-900">{event.title}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 flex items-center gap-3">
              <div className='pt-1 bg-gray-100 rounded-md'>
                  <Calendar1Icon size={20} />
                </div>
                Fecha
              </h3>
              <p className="text-gray-900">{event.date.toLocaleDateString()}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 flex items-center gap-3">
                <div className='pt-1 bg-gray-100 rounded-md'>
                  <AppWindow size={20} />
                </div>
                Tipo
              </h3>
              <p className="text-gray-900">{event.type}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SidebarDetails