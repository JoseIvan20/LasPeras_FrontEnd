import { Pin } from 'lucide-react'
import FormContact from './components/secctions/FormContact'
import Slider from './components/Slider'
import circleImage from './images/circle_1.svg'
import circleImage2 from './images/circle_2.svg'
import pearIcon from './images/pear-icon.svg'
import LocationSection from './components/secctions/LocationSection'
import AnimatedPearIcon from './components/animations/AnimatedPearIcon'
import AnimatedCircle from './components/animations/AnimatedCircle'
import WhatsAppButton from './components/button/WhatsAppButton'
import TestimonialsSection from './components/secctions/TestimonialsSection'

const LandingPage = () => {
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
      <div className="container relative z-10 mx-auto px-4 py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Columna izquierda */}
          <div className="space-y-8">
            {/* Título con icono de pera */}
            <div className="relative">
              <h1 className="text-6xl font-bold text-gray-800 lg:text-8xl">
                Las
                <span className="relative">
                  <AnimatedPearIcon
                    src={pearIcon}
                    alt='Logo Las Peras'
                    className="absolute lg:-left-11 lg:-top-10 lg:w-[150px] lg:h-[150px] sm:w-[100px] sm:-left-7 sm:-top-8 w-20 -left-5 -top-4"
                  />
                  &nbsp; <span className='lg:text-[#9C9A9F] sm:text-gray-800'>Peras</span>
                </span>
              </h1>
            </div>

            {/* Texto descriptivo */}
            <p className="max-w-xl text-lg text-gray-600">
            Bienvenidos a Las Peras, un encantador salón de eventos al aire libre rodeado de exuberante vegetación. Aquí, cada momento especial cobra vida en un ambiente natural único, acompañado de una experiencia gastronómica inolvidable con platillos deliciosos. Ideal para celebraciones que desean un toque de magia y frescura.
            </p>

            {/* Formulario de contacto */}
            <div className='flex sm:justify-center lg:justify-start'>
              <FormContact />
            </div>
          </div>

          {/* Carrusel o Slider de imagenes */}
          <div className="relative h-full ">
            <Slider />
            <div className='absolute top-4 right-4 z-20'>
              <WhatsAppButton
                phoneNumber='5517430604' />
            </div>
          </div>
        </div>
      </div>

      <div className='container relative z-10 mx-auto px-4 lg:py-12 sm:py-3 py-6'>
        <TestimonialsSection />
      </div>

      {/* Seccion de ubicacion */}
      <div className='container relative z-10 mx-auto px-4 lg:py-12 sm:py-3 py-6'>
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

export default LandingPage