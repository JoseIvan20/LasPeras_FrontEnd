import { useState } from 'react'
import { User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TestimonialProps {
  id: number
  name: string
  role: string
  content: string
  image?: string
}

const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: "María García",
    role: "Novia feliz",
    content: "El Salón de Eventos Las Peras hizo que nuestra boda fuera un sueño hecho realidad. El lugar es hermoso y el servicio fue excepcional.",
  },
  {
    id: 2,
    name: "Juan Pérez",
    role: "Gerente de eventos corporativos",
    content: "Organizamos nuestro evento anual de la empresa aquí y quedamos impresionados. Las instalaciones son de primera clase y el personal es muy profesional.",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Quinceañera",
    content: "Mi fiesta de quince años fue perfecta gracias a Las Peras. El lugar es precioso y todos mis invitados quedaron encantados.",
  },
  {
    id: 4,
    name: "Alberto Alvarez",
    role: "Cliente",
    content: "La comida muy sabrosa, me gustó que no le ponen tanta sal y eso se agradece. El aroma del café llegó hasta mi mesa después de la comida, no pude resistir el antojo y claro lo pedimos. Café de buen cuerpo, ligero y gran sabor. Tienen comida para llevar !!! Y el precio muy accesible. Regresaremos.",
  },
  {
    id: 5,
    name: "Carlos",
    role: "Cliente",
    content: "Excelente opción para desayunar!!! El lugar esta súper bonito y los precios son económicos Súper recomendable 👍🏻.",
  },
  {
    id: 6,
    name: "Delfino Cortes",
    role: "Cliente",
    content: "Un buen lugar para desayunar tranquilamente, el desayuno muy rico todo, buenas porciones de fruta 🍇🍈, la atención muy buena.",
  },
]

const TestimonialCard = ({
  name,
  role,
  content,
  image
}: TestimonialProps) => (
  <div className="relative bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center gap-4 mb-4">
      {image ? (
        <img src={image} alt={name} className="w-12 h-12 rounded-full" />
      ) : (
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
      )}
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
  </div>
)

const TestimonialsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const initialDisplayCount = 3

  return (
    <section className="py-16 bg-gray-50 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-500 mb-12">
          Lo que dicen nuestros clientes
        </h2>

        <div className="relative">
          <div className={`grid gap-6 md:gap-8 ${isExpanded ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            <AnimatePresence>
              {testimonials.slice(0, isExpanded ? testimonials.length : initialDisplayCount).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-50 pointer-events-none" />
          )}

          {testimonials.length > initialDisplayCount && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white px-6 py-3 rounded-full shadow-sm text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 z-20"
              >
                {isExpanded ? 'Mostrar menos' : 'Mostrar más...'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection