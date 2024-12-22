export interface MailBody {
  name: string
  email: string
  phone?: string
  date?: string
  numberOfPeople?: number
  typeOfCelebration?: string | number
  message: string
}

export interface MailResponse {
  message: string
}