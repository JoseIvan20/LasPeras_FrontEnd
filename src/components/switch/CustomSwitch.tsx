import React from 'react'
import { motion } from 'framer-motion'

interface CustomSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string | ((checked: boolean) => React.ReactNode)
  color?: 'success' | 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

const CustomSwitch = ({ 
  checked, 
  onChange, 
  label, 
  color = 'success', 
  disabled = false 
}: CustomSwitchProps) => {
  const springConfig = { type: "spring", stiffness: 700, damping: 30 } as const
  
  const bgColor: Record<string, string> = {
    success: 'rgba(34, 197, 94, 1)', // green-500
    primary: 'rgb(75, 85, 99, 1)', // gray-600
    secondary: 'rgba(107, 114, 128, 1)', // gray-500
    danger: 'rgba(239, 68, 68, 1)', // red-500
  }

  const ringColor: Record<string, string> = {
    success: 'peer-focus:ring-green-300',
    primary: 'peer-focus:ring-gray-300',
    secondary: 'peer-focus:ring-gray-300',
    danger: 'peer-focus:ring-red-300'
  }

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <motion.div
          className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 ${ringColor[color]} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          animate={{
            backgroundColor: checked ? bgColor[color] : 'rgba(229, 231, 235, 1)' // gray-200
          }}
          initial={{
            backgroundColor: checked ? bgColor[color] : 'rgba(229, 231, 235, 1)' // gray-200
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5"
            animate={{
              x: checked ? 20 : 0
            }}
            transition={springConfig}
          />
        </motion.div>
      </label>
      {label && (
        <span className={`ml-3 text-sm font-medium text-gray-900 ${disabled ? 'opacity-50' : ''}`}>
          {typeof label === 'function' ? label(checked) : label}
        </span>
      )}
    </div>
  )
}

export default CustomSwitch

