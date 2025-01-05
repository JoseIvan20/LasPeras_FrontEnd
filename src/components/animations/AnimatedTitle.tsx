// Archivo que anima el titulo "Las peras"
import { motion } from 'framer-motion'
import AnimatedPearIcon from './AnimatedPearIcon'
import { useEffect, useState } from 'react'
import { child, container } from '../../utils/animations'
import pearIcon from '../../images/pear-icon.svg'

const AnimatedTitle = () => {

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative overflow-hidden p-8 md:p-12">
      <motion.div
        className="flex items-center justify-center"
        variants={container}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="relative">
          <h1 className="text-6xl font-bold text-gray-800 lg:text-8xl flex items-center">
            {/* Animación de "Las" */}
            <div className="flex">
              {["L", "a", "s"].map((letter, index) => (
                <motion.span
                  key={index}
                  variants={child}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Espacio y Pera */}
            <span className="mx-4 md:mx-6">
              <AnimatedPearIcon
                src={pearIcon}
                alt='Logo Las Peras'
                className="absolute lg:left-24 lg:-top-14 lg:w-[150px] lg:h-[150px] sm:w-[110px] sm:left-16 sm:-top-10 left-16 -top-9 w-[90px]"
              />
            </span>

            {/* Animación de "Peras" */}
            <div className="flex">
              {["P", "e", "r", "a", "s"].map((letter, index) => (
                <motion.span
                  key={index}
                  variants={child}
                  className="inline-block lg:text-[#9C9A9F] sm:text-gray-800"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </h1>
        </div>
      </motion.div>
    </div>
  )
}

export default AnimatedTitle