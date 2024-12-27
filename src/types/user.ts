export interface UserBody { // Props de un usuario
  _id: number
  name: string
  email: string
  phone: string,
  date: string,
  numberOfPeople: number,
  typeOfCelebration: string,
  status: string
  message?: string
}

export interface AuthBody {
  message: string,
  id: string,
  name: string,
  consumer: string,
  checkpoint: string
  rol: number,
  token: string
}