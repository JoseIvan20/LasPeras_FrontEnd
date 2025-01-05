import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ImagePlus, Pause, Play, Settings } from 'lucide-react'
import { slideVariants } from '../utils/animations'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from "@cloudinary/url-gen/actions/resize"
import { format, quality } from "@cloudinary/url-gen/actions/delivery"
import { auto } from "@cloudinary/url-gen/qualifiers/format"
import useImage from '../hooks/useImage'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// Configuración de Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
})

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function Slider() {
  const [[page, direction], setPage] = useState([0, 0])
  const [autoPlay, setAutoPlay] = useState(true)

  const { isAuthenticated } = useSelector((state: any) => state.auth)

  // Hook de imagenes
  const {
    getImages = [],
    isPendingImages
  } = useImage()

  useMemo(() => {
    getImages
  },[getImages])

  // Filtramos las imagenes activas 
  const activeImages = getImages.filter(img => img.isActive)

  // const slideIndex = Math.abs(page % getImages.length)
  const slideIndex = activeImages.length > 0 ? Math.abs(page % activeImages.length) : 0

  const paginate = (newDirection: number) => {
    if (activeImages.length === 0) return // Si no hay imagenes
    setPage(prevState => {
      const [prevPage] = prevState
      return [prevPage + newDirection, newDirection]
    })
  }

  useEffect(() => {
    if (autoPlay && activeImages.length > 0) {
      const timer = setInterval(() => {
        paginate(1)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [autoPlay, activeImages.length])

  // Si está cargando, mostrar un estado de carga
  if (isPendingImages) {
    return (
      <div className="relative h-full min-h-[600px] w-full overflow-hidden rounded-xl shadow-2xl bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Cargando imágenes...</div>
      </div>
    )
  }

  // Solo tomara las imagenes activas
  if (activeImages.length === 0) {
    return (
      <div className="relative h-full min-h-[600px] w-full overflow-hidden rounded-xl shadow-2xl bg-gray-100 flex flex-col items-center justify-center">
        <ImagePlus size={48} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay imágenes activas en el carrusel</h3>
        <p className="text-gray-500 mb-4"> {isAuthenticated ? 'Agrega o activa algunas imágenes para comenzar' : 'Espera a que el administrador agregue o active algunas imágenes'} </p>
        {isAuthenticated && (
          <NavLink
            to='/gestion-image'
            className='rounded-full bg-white px-6 py-3 text-sm font-medium shadow-lg transition-all hover:bg-gray-50 flex items-center gap-2'
          >
            <Settings size={16} />
            Gestionar imágenes
          </NavLink>
        )}
      </div>
    )
  }

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
              src={cld.image(activeImages[slideIndex].publicId)
                .resize(fill().width(1200).height(800))
                .delivery(format(auto()))
                .delivery(quality(100))
                .toURL()}
              alt={activeImages[slideIndex].alt}
              className="h-full w-full rounded-xl object-cover"
              loading={slideIndex === 0 ? "eager" : "lazy"}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {isAuthenticated && (
        <NavLink
          to='/gestion-image'
          className='absolute top-5 left-5 z-10 rounded-full bg-white/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm transition-all hover:bg-white duration-200 items-center gap-2 flex' >
          <Settings size={16} />
          Gestionar imagenes
        </NavLink>
      )}

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
        {activeImages.map((_, index) => (
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