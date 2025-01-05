// Estados del cliente
export const userContactStatus = [
  { value: "pending", label: "Pendiente" },
  { value: "in_progress", label: "En progreso" },
  { value: "finalized", label: "Finalizado" },
  { value: "overdue", label: "Atrasado" },
  { value: "canceled", label: "Cancelado" }
]

export type UserStatus = "pending" | "in_progress" | "finalized" | "overdue" | "canceled"