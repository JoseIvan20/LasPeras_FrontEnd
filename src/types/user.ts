export interface UserBody { // Props de un usuario
  _id: number
  name: string
  email: string
  phone: string
  date: string
  numberOfPeople: number
  typeOfCelebration: string
  status: string
  message?: string
}

// Props de autenticacion
export interface AuthBody {
  message: string
  name: string
  consumer: string
  token: string
  user: UserBody
}

// Props de Mensaje
export interface CommentBody {
  name: string
  role: string
  content: string
  rating: number
}