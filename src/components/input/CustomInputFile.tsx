import { type LucideIcon } from 'lucide-react'
import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react'

interface CustomInputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  error?: string
  accept?: string
  onFileSelect?: (file: File | null) => void
}

const CustomInputFile = forwardRef<HTMLInputElement, CustomInputFileProps> (({ 
  label, 
  icon: Icon, 
  error,
  accept,
  onFileSelect,
  ...props 
}, ref) => {

  const [fileName, setFileName] = useState<string>('')
  const [key, setKey] = useState<number>(0)

  useEffect(() => {
    // Resetear el input cuando el componente se monta o cuando las props cambian
    setFileName('')
    setKey(prev => prev + 1)
  }, [props.value])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      setFileName(file.name)
      if (onFileSelect) {
        onFileSelect(file)
      }
    } else {
      setFileName('')
      if (onFileSelect) {
        onFileSelect(null)
      }
    }
  }

  const inputClasses = `w-full px-4 py-2 ${
    Icon ? "pl-10" : "pl-4"
  } border rounded-lg focus:outline-none focus:ring-2 duration-200 focus:shadow-md ${
    error 
      ? "border-red-500 focus:ring-red-500 text-red-600" 
      : "border-gray-200 focus:ring-slate-700 text-slate-600"
  }`

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
        )}
        <input
          key={key}
          type='file'
          className={inputClasses}
          ref={ref}
          accept={accept}
          onChange={handleFileChange}
          {...props}
        />
        {fileName && (
          <div className="mt-2 text-sm text-gray-600">
            Archivo seleccionado: {fileName}
          </div>
        )}
      </div>
    </div>
  )
})

CustomInputFile.displayName = 'CustomInputFile'

export default CustomInputFile