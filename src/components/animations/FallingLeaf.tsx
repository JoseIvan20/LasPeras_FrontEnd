import { motion } from 'framer-motion'

interface FallingLeafProps {
  delay: number
}

const FallingLeaf = ({ delay }: FallingLeafProps) => {
  return (
    <motion.div
      style={{
        width: '15px',
        height: '15px',
        borderRadius: '50% 0 50% 50%',
        background: '#444',
        position: 'absolute',
        top: '0',
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: ['0vh', '100vh'],
        x: ['0%', `${(Math.random() - 0.5) * 100}%`],
        rotate: [0, 360],
        opacity: [1, 0],
      }}
      transition={{
        duration: 8,
        ease: 'linear',
        repeat: Infinity,
        delay: delay,
      }}
    />
  )
}

export default FallingLeaf