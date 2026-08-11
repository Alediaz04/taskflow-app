import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, spacing } from '../theme'

type EmptyStateProps = {
  title?: string
  subtitle?: string
}

export default function EmptyState({
  title = '¡No tienes tareas pendientes!',
  subtitle = 'Empieza por crear una con el botón de abajo.'
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🗒️</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
    color: colors.ink,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted, 
    textAlign: 'center'
  }
})