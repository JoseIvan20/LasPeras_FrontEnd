import { type LucideIcon } from 'lucide-react'
import Spinner from "../Spinner"

export interface CustomButtonProps {
  buttonText?: string
  icon?: LucideIcon
  type?: "submit" | "reset" | "button"
  className?: string
  isLoading?: boolean
  loadingText?: string
  disabled?: boolean
  onClick?: () => void
}

const CustomButton = ({ 
  buttonText ,
  icon: Icon, 
  type = "button", 
  className = "", 
  isLoading = false,
  loadingText = "Cargando...",
  disabled = false,
  onClick, 
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={disabled ? 
        (`flex items-center px-4 py-2 bg-[#444444] rounded-md text-white shadow-md justify-center`) 
          : 
        (`flex items-center px-4 py-2 border-2 border-[#444444] rounded-md text-[#444444] hover:shadow-md hover:bg-[#444444] hover:text-white duration-300 justify-center ${className}`)}
    >
      {isLoading ? (
        <div className='flex justify-center items-center gap-3'>
          <Spinner size={20} borderColor='border-[#F6F6F6]' />
          <span className='text-sm'> {loadingText} </span>
        </div>
      ) : (
        <>
          {Icon && (
            <Icon className="w-5 h-5 mr-2" />
          )}
          <span>{buttonText}</span>
        </>
      )}
    </button>
  )
}



export default CustomButton

