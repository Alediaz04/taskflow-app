export type Category = string

export type CustomCategory = {
  id: string
  label: string
  color: string
  soft: string
  emoji: string
  userId?: string
}

export type CategoryMeta = {
  label: string
  color: string
  soft: string
  emoji: string
}

export type DueDate = 'today' | 'tomorrow' | 'nextWeek'

export type Task = {
  id: string
  title: string
  description : string
  category: Category
  date: DueDate
  completed: boolean
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  trabajo: { label: 'Trabajo', color: '#5B7CFA', soft: '#E9EDFE', emoji: '💼' },
  personal: { label: 'Personal', color: '#FE64A3', soft: '#FFE9F3', emoji: '🌱' },
  estudio: { label: 'Estudio', color: '#9B59D0', soft: '#F3E9FB', emoji: '📚' },
  hogar: { label: 'Hogar', color: '#2FA36B', soft: '#E3F4EB', emoji: '🏠' }
}

export const getCategoryMeta = (
  categoryKey: string,
  customCategories?: CustomCategory[]
): CategoryMeta => {
  if (CATEGORIES[categoryKey]) {
    return CATEGORIES[categoryKey]
  }

  const custom = customCategories?.find(
    (c) => c.id === categoryKey || c.label.toLowerCase() === categoryKey.toLowerCase()
  )
  if (custom) {
    return {
      label: custom.label,
      color: custom.color,
      soft: custom.soft,
      emoji: custom.emoji
    }
  }

  return {
    label: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
    color: '#F59E0B',
    soft: '#FEF3C7',
    emoji: '🏷️'
  }
}

export const DUE_DATES: Record<DueDate, string> = {
  today: 'Hoy',
  tomorrow: 'Mañana',
  nextWeek: 'Próxima semana'
}

export const createId = () =>
  `task-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`


export type TabKey = 'flatlist' | 'scrollview'