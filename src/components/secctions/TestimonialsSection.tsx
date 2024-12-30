import { useState } from 'react'
import { MessageCirclePlus, MessageCirclePlusIcon, Star, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomButton from '../button/CustomButton'
import { useComment } from '../../hooks/useComment'
import Modal from '../modal/Modal'
import ModalComment from '../../view/modal/ModalComment'
import Lottie from 'react-lottie'
import emptyCommentsAnimation from '../../assets/animations/empty-comments.json'

interface TestimonialProps {
  id: number
  name: string
  role: string
  content: string
  image?: string
  rating: number
}

const TestimonialCard = ({
  name,
  role,
  content,
  image,
  rating
}: TestimonialProps) => (
  <div className="relative bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
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
      <div className='flex'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
  </div>
)

const TestimonialsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOpenModal, setIsModalOpen] = useState(false)
  const initialDisplayCount = 3 // Cuando hayan mas de 3 comentarios aparece el boton de Mostrar mas
 
  const {
    getComments
  } = useComment() // Hook de comentarios

  // Funcion que levantaria un modal para agregar el comentario
  const handleSubmitComment = () => {
    setIsModalOpen(true)
  }

  // Cierre de modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Implementacion de lottie
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCommentsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <>
      <section className="py-16 bg-gray-50 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className='flex md:justify-end justify-center mb-4'>
            <CustomButton
              buttonText='Agregar comentario'
              icon={MessageCirclePlus}
              onClick={() => handleSubmitComment()} />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-500 mb-12">
            Lo que dicen nuestros clientes
          </h2>

          <div className="relative">
            <div className=''>
              <AnimatePresence>
                {getComments.length > 0 ? (
                  <div className={`grid gap-6 md:gap-8 ${isExpanded ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                    {getComments.slice(0, isExpanded ? getComments.length : initialDisplayCount).map((testimonial: any, index: any) => (
                      <motion.div
                        key={testimonial.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <TestimonialCard 
                          id={testimonial.id}
                          key={testimonial.id || index}
                          name={testimonial.name}
                          role={testimonial.role}
                          content={testimonial.content}
                          image={testimonial.image}
                          rating={testimonial.rating}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md"
                  >
                    <Lottie options={lottieOptions} height={200} width={200} />
                    <p className="mt-4 text-xl text-gray-600 text-center">
                      Aún no hay comentarios. ¡Sé el primero en compartir tu experiencia!
                    </p>
                    <br />
                    <br />
                    <br />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!isExpanded && (
              <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-50 pointer-events-none" />
            )}

            {getComments.length > initialDisplayCount && (
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
    
      <Modal
        title='Agregar comentario'
        icon={MessageCirclePlusIcon}
        isOpen={isOpenModal}
        onClose={() => setIsModalOpen(false)}
        size='sm' >
        <ModalComment onClose={handleCloseModal} />
      </Modal>
    </>
  )
}

export default TestimonialsSection