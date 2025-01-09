import { Pin } from 'lucide-react'
import FormContact from '../components/secctions/FormContact'
import Slider from '../components/Slider'
import circleImage from '../images/circle_1.svg'
import circleImage2 from '../images/circle_2.svg'
import LocationSection from '../components/secctions/LocationSection'
import AnimatedCircle from '../components/animations/AnimatedCircle'
import WhatsAppButton from '../components/button/WhatsAppButton'
import TestimonialsSection from '../components/secctions/TestimonialsSection'
import AnimatedTitle from '../components/animations/AnimatedTitle'
import useWhatsApp from '../hooks/useWhatsApp'

const Home = () => {

  const { getConfig } = useWhatsApp()
  console.log(getConfig?.isActive)

  return (
    <main className='relative min-h-screen overflow-hidden bg-white'>
      {/* Circulo decorativo superior izquierdo */}
      <AnimatedCircle
        src={circleImage}
        alt='Circulo superior izquierda'
        className='w-[400px] h-[400px]'
        position='top-left' />

      {/* Circulo decorativo inferior derecho */}

      <AnimatedCircle
        src={circleImage2}
        alt="Círculo decorativo"
        className="w-[200px] h-[200px]"
        position="bottom-right"
      />

      {/* Seccion de formulario y slider */}
      <div 
        id='inicio'
        className="container relative mx-auto px-4 py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Columna izquierda */}
          <div className="space-y-8">
            {/* Título con icono de pera */}
            <div className="relative">
              <AnimatedTitle />
            </div>

            {/* Texto descriptivo */}
            <p className="lg:max-w-xl text-lg text-gray-600 text-center lg:text-start">
            Bienvenidos a Las Peras, un encantador salón de eventos al aire libre rodeado de exuberante vegetación. Aquí, cada momento especial cobra vida en un ambiente natural único. Ideal para celebraciones que desean un toque de magia y frescura.
            </p>

            {/* Formulario de contacto */}
            <div className='flex sm:justify-center lg:justify-start'>
              <FormContact />
            </div>
          </div>

          {/* Carrusel o Slider de imagenes */}
          <div className="relative h-full ">
            <Slider />
            <div className={`absolute top-4 right-4 z-20 ${!getConfig?.isActive ? 'hidden' : 'block'}`}>
              <WhatsAppButton  />
            </div>
          </div>
        </div>
      </div>

      <div
        id='opiniones' 
        className='container relative mx-auto px-4 lg:py-12 sm:py-3 py-6'>
        <TestimonialsSection />
      </div>

      {/* Seccion de ubicacion */}
      <div 
        id='ubicacion'
        className='container relative z-10 mx-auto px-4 lg:py-12 sm:py-3 py-6'>
        <div className="mb-10 flex items-center gap-4">
          <Pin className="text-gray-500" size={32} />
          <span className="border-b-2 border-gray-500 text-3xl text-gray-500 font-bold">
            Ubicacion
          </span>
        </div>

        <div>
          <LocationSection />
        </div>
      </div>

    </main>
  )
}

export default Home