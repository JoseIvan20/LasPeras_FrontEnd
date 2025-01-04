// Props de autenticacion
export interface AdminBody {
  message: string
  _id: string
  name: string
  consumer: string
  rol: number
  token: string
  active: number
  checkpoint: string
  status: string
}

export interface ConfirmUserBody {
  consumer: string,
  confirmationCode: string
}