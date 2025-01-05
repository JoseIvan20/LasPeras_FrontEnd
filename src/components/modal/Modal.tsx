// - Componente Modal

import { AnimatePresence, motion } from 'framer-motion'
import { BadgeXIcon, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  icon: LucideIcon
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  canCloseOnOverlayClick?: boolean
}

const Modal = ({ 
  isOpen,
  icon: Icon,
  onClose,
  title,
  children,
  size = 'md',
  canCloseOnOverlayClick = false 
}: ModalProps) => {
   
   // Tamanios del modal
  const sizeClasses = {
    sm: 'max-w-[95%] sm:max-w-md',
    md: 'max-w-[95%] sm:max-w-2xl',
    lg: 'max-w-[95%] sm:max-w-4xl',
    xl: 'max-w-[95%] sm:max-w-5xl'
  }

  const handleOverlayClick = () => {
    if (canCloseOnOverlayClick) {
        onClose()
    }
  }

  const handleModalClick = (e: any) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }
            }}
            exit={{ opacity: 0, y: -50 }}
            className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl relative`} 
            onClick={handleModalClick}
          >
            <motion.button
              whileHover={{ 
                y: 5,
                x: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className='absolute -top-3 -right-3 p-2.5 bg-white hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-700 transition-colors shadow-lg'
              onClick={onClose} 
            >
              <BadgeXIcon className='w-6 h-6' />
            </motion.button>

            {/* Titulo del modal */}
            {title && (
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="flex items-center text-lg text-gray-700 font-semibold">
                  <Icon size={30} />
                  &nbsp;
                  &nbsp;
                  {title}
                </h3>
              </div>
            )}

            {/* Contenido */}
            <div className='p-6 max-h-[80vh] overflow-y-auto'>
                {children}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

}

export default Modal