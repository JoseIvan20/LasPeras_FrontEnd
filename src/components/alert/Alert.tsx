import { Bell, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../helper/cn'

const alertVariants = cva(
  "relative flex items-center gap-3 rounded-lg p-4 pr-10 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-600 shadow-sm",
        primary: "bg-indigo-500 text-white",
        secondary: "bg-slate-400 text-white",
        success: "bg-green-400 text-white",
        danger: "bg-red-500 text-white", 
        warning: "bg-amber-400 text-white",
        info: "bg-cyan-400 text-white"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

interface AlertProps extends VariantProps<typeof alertVariants> {
  title: string
  message: string
  icon?: React.ElementType
  timestamp?: string
  onClose?: () => void
  className?: string
}

const Alert = ({
  title,
  message,
  icon: Icon = Bell,
  timestamp,
  onClose,
  variant,
  className
}: AlertProps) => {
  return (
    <div className={cn(alertVariants({ variant }), className)}>
      <Icon className="h-5 w-5" />
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h5 className="font-medium">{title}</h5>
          {timestamp && (
            <span className="text-sm opacity-75">{timestamp}</span>
          )}
        </div>
        <p className="text-sm">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 hover:bg-black/5 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
}

export default Alert