import { Calendar, LucideIcon } from 'lucide-react'
import React, { forwardRef, useRef, useImperativeHandle } from 'react'

interface DateInputProps {
  label: string
  name: string
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean
  min?: string
  max?: string
  icon?: LucideIcon
  error?: string
  className?: string
}

const CustomDateInput = forwardRef<HTMLInputElement, DateInputProps>(({
  label,
  name,
  value,
  onChange,
  required = false,
  min,
  max,
  className = '',
  icon: Icon = Calendar,
  error,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

  const inputClasses = `w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 duration-200 focus:shadow-md ${
    error 
      ? "border-red-500 focus:ring-red-500 text-red-600" 
      : "border-gray-200 focus:ring-slate-700 text-slate-600"
  } [&::-webkit-calendar-picker-indicator]:hidden`

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker()
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div 
          className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
          onClick={handleIconClick}
        >
          <Icon className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
        </div>
        <input
          type="date"
          id={name}
          name={name}
          value={value || ''} // Update 3: Ensured value is never undefined
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          className={inputClasses}
          ref={inputRef}
          {...props}
        />
      </div>
    </div>
  )
})

CustomDateInput.displayName = 'CustomDateInput'

export default CustomDateInput