import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, CircleX } from "lucide-react"
import { errorVariants } from "../../utils/animations"

export interface MessageProps {
  success?: string
  error?: string
}

export const MessageSuccess = ({ success }: MessageProps) => {
  return (
    <div className="mb-4">
      <AnimatePresence mode='wait'>
        {success && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={errorVariants}
            className='flex items-center text-green-700 text-sm mt-1 bg-green-100 font-semibold rounded-md p-2 mb-2 gap-2 justify-center'
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const MessageError = ({ error }: MessageProps) => {
  return (
    <div className="mb-4">
      <AnimatePresence mode='wait'>
        {error && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={errorVariants}
            className='flex items-center text-red-700 text-sm mt-1 bg-red-100 font-semibold rounded-md p-2 mb-2 gap-2 justify-center'
          >
            <CircleX className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

