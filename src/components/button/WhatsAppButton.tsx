import { MessageCircleMore } from "lucide-react"
import CustomButton from "./CustomButton"
import useWhatsApp from "../../hooks/useWhatsApp"

const WhatsAppButton = () => {
  const { getConfig } = useWhatsApp()

  const handleClick = () => {
    if (getConfig?.phoneNumber) {
      const message = getConfig.defaultMessage || ''
      // Si hay mensaje, aplicar formato, si no, dejar vacío
      const formattedMessage = message 
        ? `*${message}* \n\n\n`
        : ''
      const encodedMessage = encodeURIComponent(formattedMessage)
      const whatsappUrl = `https://wa.me/${getConfig.phoneNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
    } else {
      console.error("No se ha configurado un número de teléfono para WhatsApp")
    }
  }

  if (!getConfig || !getConfig.isActive) return null

  return (
    <CustomButton
      buttonText="WhatsApp"
      icon={MessageCircleMore}
      onClick={handleClick}
      type="button"
      className="bg-[#25d366] text-white hover:bg-emerald-500 border-[#dcf8c6]"
    />
  )
}

export default WhatsAppButton