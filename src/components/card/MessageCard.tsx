import { LucideIcon } from 'lucide-react'

interface MessageCardProps {
  title: string
  titleClass?: string
  count: number
  icon: LucideIcon
  backgroundColor?: string
  className?: string
}

export default function MessageCard({ 
  title,
  titleClass,
  count,
  icon: Icon,
  backgroundColor,
  className 
}: MessageCardProps) {
  return (
    <div 
      className={`
        flex items-center justify-between gap-4 p-4 rounded-lg text-white
        w-full sm:max-w-xs duration-200 shadow-md
        ${backgroundColor}
        ${className}
      `}
    >
      <div className="flex items-center justify-center p-2 bg-white/30 rounded-lg">
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <div className="flex flex-col">
        <span className={`${titleClass}`}>{title}</span>
        <span className="text-2xl font-bold">{count}</span>
      </div>
    </div>
  )
}

