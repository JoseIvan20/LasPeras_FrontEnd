import { AnimatePresence, motion } from "framer-motion"
import { CircleX, LucideIcon } from 'lucide-react'
import CustomTextarea from "../input/CustomTextarea"
import CustomInput from "../input/CustomInput"
import { errorVariants } from "../../utils/animations"
import { forwardRef, InputHTMLAttributes } from "react"
import CustomDateInput from "../input/CustomInputDate"

export interface MessageToastyProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: LucideIcon
}

const MessageToasty = forwardRef<HTMLInputElement, MessageToastyProps>(
  ({ label, error, icon: Icon, type, ...props }, ref) => {
    // const InputComponent = type === 'textarea' ? CustomTextarea : CustomInput
    let InputComponent: React.ElementType
    if (type === 'textarea') {
      InputComponent = CustomTextarea
    } else if (type === 'date') {
      InputComponent = CustomDateInput
    } else {
      InputComponent = CustomInput
    }

    return (
      <div className="mb-4">
        <AnimatePresence mode='wait'>
          {error && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={errorVariants}
              className='flex items-center text-red-700 text-sm mt-1 bg-red-100 font-semibold rounded-md p-2 mb-2 gap-2'
            >
              <CircleX className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <InputComponent
          label={label}
          icon={Icon}
          error={error}
          ref={ref as any}
          {...props}
        />
      </div>
    )
  }
)

MessageToasty.displayName = 'MessageToasty'

export default MessageToasty