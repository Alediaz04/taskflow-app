export type Category = 'trabajo' | 'personal' | 'estudio' | 'hogar'

export type DueDate = 'today' | 'tomorrow' | 'nextWeek'

export type Task = {

  id: string
  title: string
  description : string
  category: Category
  date: DueDate
  completed: boolean
}

export const CATEGORIES: Record<
  Category,
  {
    /** Texto que ve el usuario. */
    label: string
    /** Color fuerte: bordes, chip activo, badge del detalle. */
    color: string
    /** Versión suave del mismo color: fondos de badges (`soft` = pastel). */
    soft: string
    /** Emoji: ícono gratis, sin instalar librerías de íconos. */
    emoji: string
  }
> = {
  trabajo: { label: 'Trabajo', color: '#5B7CFA', soft: '#E9EDFE', emoji: '💼' },
  personal: { label: 'Personal', color: '#FE64A3', soft: '#FFE9F3', emoji: '🌱' },
  estudio: { label: 'Estudio', color: '#9B59D0', soft: '#F3E9FB', emoji: '📚' },
  hogar: { label: 'Hogar', color: '#2FA36B', soft: '#E3F4EB', emoji: '🏠' }
}

export const DUE_DATES: Record<DueDate, string> = {
  today: 'Hoy',
  tomorrow: 'Mañana',
  nextWeek: 'Próxima semana'
}

export const createId = () =>
  `task-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`


export type TabKey = 'flatlist' | 'scrollview'