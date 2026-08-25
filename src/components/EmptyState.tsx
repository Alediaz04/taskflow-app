import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { spacing, useAppTheme } from '../theme'

type EmptyStateProps = {
  title?: string
  subtitle?: string
}

export default function EmptyState({
  title = '¡No tienes tareas pendientes!',
  subtitle = 'Empieza por crear una con el botón de abajo.'
}: EmptyStateProps) {
  const { colors } = useAppTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🗒️</Text>
      <Text style={[styles.title, { color: colors.ink }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl * 2,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.sm
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center'
  }
})