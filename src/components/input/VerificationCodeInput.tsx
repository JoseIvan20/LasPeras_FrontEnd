import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CircleX } from 'lucide-react'

interface VerificationCodeInputProps {
  onChange: (code: string) => void
  error?: string
}

const VerificationCodeInput = ({ onChange, error }: VerificationCodeInputProps) => {
  const [code, setCode] = useState(['', '', '', '', '', '']) // Array de 6 strings
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]) // Referencia de los 6 digitos, permitiendo manipularlos

  // Se ejecutara cada que code cambia, es decir, el digito
  // Combina todos los elementos en un solo string y llama a la funcion onChange proporcionada como una prop
  useEffect(() => {
    onChange(code.join(''))
  }, [code, onChange])

  // Se manda a llamar cada vez que se modifica un input
  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) { // Verifica que el valor no tenga mas de un valor ingresado
      const newCode = [...code] // Actualiza el digito correspondiente del array code
      newCode[index] = value
      setCode(newCode)

      // Si se ingreso un digito y no es el ultimo input, mueve el foco al siguiente input
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  // Funcion que maneja la tecla de retroceso (backspace)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Si se presiona backspace en un input vacío (que no sea el primero), mueve el foco al input anterior
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Renderizado
  return (
    <div className="mb-4">
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center text-red-700 text-sm mt-1 bg-red-100 font-semibold rounded-md p-2 mb-2 gap-2"
        >
          <CircleX className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.p>
      )}
      <label className="block text-sm font-medium text-gray-700 mb-2">Código de verificación</label>
      <div className="flex flex-wrap justify-between">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center text-2xl border rounded-md focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 duration-300"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
    </div>
  )
}

export default VerificationCodeInput

