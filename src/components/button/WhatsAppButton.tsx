import { MessageCircleMore } from "lucide-react"
import CustomButton from "./CustomButton"

interface WhatsAppButtonProps {
  phoneNumber: string
}

const WhatsAppButton = ({
  phoneNumber
}: WhatsAppButtonProps) => {

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <CustomButton
        buttonText="WhatsApp"
        icon={MessageCircleMore}
        onClick={handleClick}
        type="button"
        className="bg-[#25d366] text-white hover:bg-emerald-500 border-[#dcf8c6]" />
    </>
  )
}

export default WhatsAppButton