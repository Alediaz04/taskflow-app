import React, { memo, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CATEGORIES, DUE_DATES, Task } from '../types'
import { radius, shadow, spacing, useAppTheme } from '../theme'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onPress: (task: Task) => void
  onMountChange?: () => () => void
}

const TaskItem = memo(function TaskItem({ task, onToggle, onPress, onMountChange }: Props) {
  useEffect(() => onMountChange?.(), [onMountChange])
  const { colors } = useAppTheme()

  const cat = CATEGORIES[task.category]

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderLeftColor: cat.color },
        task.completed && styles.cardCompleted
      ]}
      onPress={() => onPress(task)}
      activeOpacity={0.75}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: cat.color },
          task.completed && { backgroundColor: cat.color }
        ]}
        onPress={() => onToggle(task.id)}
        hitSlop={8}
      >
        {task.completed && <Text style={{ color: colors.surface, fontSize: 13, fontWeight: '800', lineHeight: 15 }}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.body}>
        <Text
          style={[styles.title, { color: colors.ink }, task.completed && { color: colors.muted, textDecorationLine: 'line-through' }]}
          numberOfLines={1}
        >
          {task.title}
        </Text>

        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: cat.soft }]}>
            <Text style={[styles.badgeText, { color: cat.color }]}>
              {cat.emoji} {cat.label}
            </Text>
          </View>
          <Text style={[styles.date, { color: colors.muted }]}>{DUE_DATES[task.date]}</Text>
        </View>
      </View>

      <Text style={[styles.chevron, { color: colors.muted }]}>›</Text>
    </TouchableOpacity>
  )
})

export default TaskItem

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    boxShadow: shadow.card
  },
  cardCompleted: {
    opacity: 0.55
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    fontSize: 15,
    fontWeight: '700'
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700'
  },
  date: {
    fontSize: 12
  },
  chevron: {
    fontSize: 22,
    marginTop: -2
  }
})