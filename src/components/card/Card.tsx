import { LucideIcon } from 'lucide-react'
import { forwardRef, HTMLAttributes } from "react"

type WidthClass = 'full' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm'

const widthClasses: Record<WidthClass, string> = {
  full: "w-full",
  xxl: "w-1/2",
  xl: "w-1/3",
  lg: "w-1/4",
  md: "w-1/5",
  sm: "w-1/6",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  subtitle?: string
  content?: string
  width?: WidthClass | string
  titleStyle?: string
  classNameTitle?: string
  iconColor?: string
  bgColorIcon?: string
  sizeIcon?: number
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  icon: Icon,
  title,
  subtitle,
  content,
  className,
  width = "full",
  titleStyle,
  classNameTitle,
  iconColor,
  bgColorIcon,
  sizeIcon,
  ...props
}, ref) => {

  const widthClass = width in widthClasses ? widthClasses[width as WidthClass] : width

  return (
    <div 
      ref={ref}
      className={`bg-white shadow-md rounded-lg p-6 ${widthClass} ${className || ''}`}
      {...props}
    >
      <div className="flex items-center mb-4">
        {Icon && 
          <Icon 
            size={sizeIcon || 24} 
            className={`mr-3 p-3 md:p-2 rounded-md ${iconColor || 'text-[#444]'} ${bgColorIcon || 'bg-gray-100'}`} 
          />
        }
        <div>
          <h2 className={`font-semibold ${titleStyle || ''} ${classNameTitle || ''}`}>{title}</h2>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {content && <p className="flex justify-end text-gray-500 text-xl md:text-2xl font-semibold">{content}</p>}
    </div>
  )
})

Card.displayName = "Card"

export default Card