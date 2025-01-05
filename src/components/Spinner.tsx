import { motion } from 'framer-motion'

interface SpinnerProps {
  size?: number
  color?: string
  borderColor?: string
}

const Spinner = ({ 
  size = 24, 
  color = 'text-[#444444]',
  borderColor
}: SpinnerProps) => {
  return (
    <div style={{ width: size, height: size }} className="relative">
      <motion.span
        className={`block w-full h-full border-4 border-t-transparent rounded-full ${color} ${borderColor}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default Spinner