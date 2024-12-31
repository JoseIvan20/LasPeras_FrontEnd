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
}