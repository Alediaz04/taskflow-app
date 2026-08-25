export interface AppColors {
  canvas: string
  backgroundColor: string
  cardBackgroundColor: string
  surface: string
  ink: string
  muted: string
  primarySoft: string
  dark: string
  success: string
  successSoft: string
  danger: string
  dangerSoft: string
  primary: string
  primaryDark: string
  border: string
  borderFocus: string
  text: string
  textSecondary: string
  category: string
  categorySelected: string
}

export const lightColors: AppColors = {
  canvas: '#e1ecf4',
  backgroundColor: '#e1ecf4',
  cardBackgroundColor: '#2F80C9',
  surface: '#FFFFFF',
  ink: '#211710',
  muted: '#8A7F72',
  primarySoft: '#FFE9E1',
  dark: '#2A1008',
  success: '#2FA36B',
  successSoft: '#E6F4ED',
  danger: '#D64545',
  dangerSoft: '#FBE9E9',
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  border: '#D6DAE4',
  borderFocus: '#4F46E5',
  text: '#111827',
  textSecondary: '#6B7280',
  category: '#EEF2FF',
  categorySelected: '#4F46E5'
}

export const darkColors: AppColors = {
  canvas: '#0A1128',
  backgroundColor: '#0A1128',
  cardBackgroundColor: '#1E293B',
  surface: '#151E3D',
  ink: '#F8FAFC',
  muted: '#94A3B8',
  primarySoft: '#312E81',
  dark: '#F8FAFC',
  success: '#34D399',
  successSoft: '#064E3B',
  danger: '#F87171',
  dangerSoft: '#7F1D1D',
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  border: '#1E293B',
  borderFocus: '#6366F1',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  category: '#1E1B4B',
  categorySelected: '#6366F1'
}

export const colors = lightColors
