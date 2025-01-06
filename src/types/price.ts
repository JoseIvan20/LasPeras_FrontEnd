export interface Payment {
  date: Date
  amount: number
  method: string
  _id?: string // Opcional, dependiendo de si se necesita manejar el ID del pago
}

export interface PriceBody { // Props de un cotizacion
  _id: string
  name: string
  email: string
  phone: number
  date: Date
  numberOfPeople: number
  typeOfCelebration: string
  message: string
  status: string
  lastContactDate: Date
  paymentStatus: string
  paymentMethod: string
  totalAmount?: number
  paidAmount?: number
  payments: Payment[]
}

// Props de autenticacion
export interface AuthBody {
  message: string
  name: string
  consumer: string
  checkpoint: string
  token: string
  user: PriceBody
}

// Props de Mensaje
export interface CommentBody {
  name: string
  role: string
  content: string
  rating: number
}