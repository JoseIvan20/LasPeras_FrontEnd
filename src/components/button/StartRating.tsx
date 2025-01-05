import { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

// Archivo que contiene la clasificacion del evento, es decir, el rating
interface StartRatingProps {
  rating: number
  onRating: (rating: number) => void
}

const StarRating = ({ 
  rating, onRating 
}: StartRatingProps) => {

  const [hover, setHover] = useState(0)
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <motion.label
            key={index}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRating(ratingValue)}
              className="hidden"
            />
            <Star
              className={`w-8 h-8 ${
                ratingValue <= (hover || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`} 
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </motion.label>
        )
      })}
    </div>
  )
}

export default StarRating