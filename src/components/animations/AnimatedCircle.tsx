import { motion } from 'framer-motion'

interface AnimatedCircleProps {
  src: string
  alt: string
  className?: string
  position: 'top-left' | 'bottom-right'
}

const AnimatedCircle = ({ 
  src, 
  alt, 
  className, 
  position 
}: AnimatedCircleProps) => {
  const positionClass = position === 'top-left' 
    ? 'absolute -left-32 -top-32 z-0' 
    : 'absolute bottom-0 right-0 z-0'

  return (
    <motion.div
      className={`${positionClass} ${className}`}
      animate={{
        y: [0, 20, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <img src={src} alt={alt} className="w-full h-full" />
    </motion.div>
  )
}

export default AnimatedCircle

