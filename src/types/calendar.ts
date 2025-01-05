export interface Event {
  id: string
  title: string
  date: Date
  status: 'finalized' | 'in_progress'
  client: string
  type: string
}