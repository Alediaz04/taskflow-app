import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native'
import { selectIsDark, toggleTheme } from '../features/theme/themeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { darkColors, lightColors } from './colors'

export function useAppTheme() {
  const dispatch = useAppDispatch()
  const isDark = useAppSelector(selectIsDark)

  const activeColors = isDark ? darkColors : lightColors
  const baseTheme = isDark ? DarkTheme : DefaultTheme

  const navTheme: Theme = {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      primary: activeColors.primary,
      background: activeColors.canvas,
      card: activeColors.surface,
      text: activeColors.ink,
      border: activeColors.border,
      notification: activeColors.danger,
    },
  }

  return {
    isDark,
    colors: activeColors,
    toggleTheme: () => dispatch(toggleTheme()),
    navTheme,
    statusBarStyle: isDark ? ('light' as const) : ('dark' as const),
  }
}
