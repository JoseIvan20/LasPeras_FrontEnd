// Interface de imagenes
export interface ImageBody {
  _id: string
  publicId: string
  title: string
  alt: string
  order: number
  isActive: boolean
  file: File | null
  fileContent: string
  message?: string
}