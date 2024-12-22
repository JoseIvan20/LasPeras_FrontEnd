import { motion } from "framer-motion"

interface AnimatedPearIcon {
  src: string
  alt: string
  className?: string
}

const AnimatedPearIcon = ({ 
  src,
  alt,
  className
}: AnimatedPearIcon) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.9 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1} >

    </motion.img>
  )
}

export default AnimatedPearIcon