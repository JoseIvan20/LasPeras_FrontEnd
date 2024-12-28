import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { slideVariants } from '../utils/animations'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from "@cloudinary/url-gen/actions/resize"
import { format, quality } from "@cloudinary/url-gen/actions/delivery"
import { auto } from "@cloudinary/url-gen/qualifiers/format"
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality"

// Configuración de Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
})

interface Slide {
  image: {
    publicId: string
    alt: string
  }
  title: string
  description: string
}

const slides: Slide[] = [
  {
    image: {
      publicId: 'contact_images/s1z5csem6q3b7o0f1pk2', 
      alt: 'Donas rosadas con chispas'
    },
    title: 'El Sabor de la Perfección',
    description: 'Déjate llevar por el irresistible sabor de nuestras donas recién horneadas.'
  },
  {
    image: {
      publicId: 'contact_images/ultqm76vubz5mfoujy0l', 
      alt: 'Descripción de la imagen 2'
    },
    title: 'Un Entorno Mágico',
    description: 'Descubre un salón de eventos rodeado de naturaleza, ideal para momentos inolvidables.'
  },
  {
    image: {
      publicId: 'contact_images/y2bezluvha8xjfdpfv5y', 
      alt: 'Descripción de la imagen 3'
    },
    title: 'Gastronomía de Primer Nivel',
    description: 'Sorprende a tus invitados con una experiencia culinaria que deleita todos los sentidos.'
  }
]

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function Slider() {
  const [[page, direction], setPage] = useState([0, 0])
  const [autoPlay, setAutoPlay] = useState(true)

  const slideIndex = Math.abs(page % slides.length)

  const paginate = (newDirection: number) => {
    setPage(prevState => {
      const [prevPage] = prevState;
      return [prevPage + newDirection, newDirection];
    });
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        paginate(1)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [autoPlay])

  return (
    <div className="relative h-full min-h-[600px] w-full overflow-hidden rounded-xl shadow-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            e.preventDefault()
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative h-full w-full">
            <img
              src={cld.image(slides[slideIndex].image.publicId)
                .resize(fill().width(1200).height(800))
                .delivery(format(auto()))
                .delivery(quality(autoQuality()))
                .toURL()}
              alt={slides[slideIndex].image.alt}
              className="h-full w-full rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const direction = index - slideIndex
              setPage([index, direction])
            }}
            className={`h-2 w-2 rounded-full transition-all ${
              index === slideIndex ? 'w-6 bg-white' : 'bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute bottom-5 right-5 z-10 rounded-full bg-white/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm transition-all hover:bg-white duration-200"
      >
        {autoPlay ? (
          <div className='flex items-center gap-1 text-gray-600'>
            <Pause size={16} />
            <span className='text-sm'>Pause</span>
          </div>
        ) : (
          <div className='flex items-center gap-1 text-gray-600'>
            <Play size={16} />
            <span className='text-sm'>Play</span>
          </div>
        )}
      </button>
    </div>
  )
}