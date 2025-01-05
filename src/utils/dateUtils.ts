// Formateo de la fecha
export function formatDateForInput(date: string | Date): string {
  if (!date) return ''
  const dateObject = date instanceof Date ? date : new Date(date)
  return dateObject.toISOString().split('T')[0]
}