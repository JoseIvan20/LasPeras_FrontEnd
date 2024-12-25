import { cva } from 'class-variance-authority'
import { cn } from '../../helper/cn'

interface LabelBadgeProps {
  labelText: string
  variant?: 'default' | 'success' | 'warning' | 'error'
  className?: string
}

// Variantes 
const badgeVariants = cva('px-2.5 py-1 rounded-md text-xs font-semibold', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  }
})

// Label
export const LabelBadge = ({
  labelText,
  variant = 'default',
  className = "",
  ...props
}: LabelBadgeProps) => {
  return (
    <span 
      className={cn(badgeVariants({ variant }), className)} {...props}>
      {labelText}
    </span>
  ) 
}