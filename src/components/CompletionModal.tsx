import React from 'react'
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { radius, shadow, spacing, useAppTheme } from '../theme'

interface CompletionModalProps {
  visible: boolean
  onClose: () => void
}

export default function CompletionModal({ visible, onClose }: CompletionModalProps) {
  const { colors } = useAppTheme()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={[styles.iconCircle, { backgroundColor: colors.success }]}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>

          <Text style={[styles.title, { color: colors.ink }]}>¡Felicitaciones! 🎉</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Has completado todas tus tareas pendientes. ¡Excelente trabajo!
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.success }]}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>¡Excelente!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    boxShadow: shadow.raised,
    gap: spacing.sm,
    elevation: 10,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    boxShadow: '0px 8px 16px rgba(47, 163, 107, 0.35)',
  },
  checkIcon: {
    fontSize: 46,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: -2,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.xs,
  },
  button: {
    width: '100%',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadow.card,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
})
