import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { CATEGORIES, Category, DueDate, DUE_DATES } from '../../types'
import { radius, shadow, spacing, screenStyles, useAppTheme, AppColors } from '../../theme'
import { RootStackParamList } from '../../navigation/types'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { createTask } from '../../services/tasks/tasksService'

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>

const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[]
const DATE_KEYS = Object.keys(DUE_DATES) as DueDate[]

export default function TaskFormScreen({ navigation }: Props) {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)

  const user = useAppSelector(selectCurrentUser)
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [category, setCategory] = useState<Category>('personal')
const [date, setDate] = useState<DueDate>('today')
const [isSubmitting, setIsSubmitting] = useState(false)

const canSubmit = title.trim().length > 0 && description.trim().length > 0 && !isSubmitting

const handleSubmit = async () => {
  if (!canSubmit || !user) return

  setIsSubmitting(true)
  try {
    await createTask(
      { title: title.trim(), description: description.trim(), category, date, completed: false },
      user.uid
    )
    navigation.navigate('TaskList')
  } catch (error) {
    console.error('Error al crear tarea:', error)
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <KeyboardAvoidingView
      style={[screenStyles.container, { backgroundColor: colors.canvas }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Crear nueva tarea</Text>
        <Text style={styles.subheading}>
          Completá el formulario para registrar tu tarea en la lista principal.
        </Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Título de la tarea *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Estudiar React Navigation"
            placeholderTextColor={colors.muted}
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Detalles sobre lo que necesitás hacer..."
            placeholderTextColor={colors.muted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.chipRow}>
            {CATEGORY_KEYS.map((key) => {
              const cat = CATEGORIES[key]
              const active = category === key

              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.chip,
                    { borderColor: cat.color },
                    active && { backgroundColor: cat.color }
                  ]}
                  onPress={() => setCategory(key)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: active ? '#FFFFFF' : cat.color }
                    ]}
                  >
                    {cat.emoji} {cat.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>¿Para cuándo?</Text>
          <View style={styles.chipRow}>
            {DATE_KEYS.map((key) => {
              const active = date === key
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.chip, styles.chipNeutral, active && styles.chipNeutralActive]}
                  onPress={() => setDate(key)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, { color: active ? colors.surface : colors.ink }]}>
                    {DUE_DATES[key]}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submit, !canSubmit && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>{isSubmitting ? 'Guardando...' : 'Guardar Tarea ✓'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('TaskList')}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
    scrollContent: {
      paddingBottom: spacing.xxl,
      gap: spacing.md
    },
    heading: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.ink
    },
    subheading: {
      fontSize: 14,
      color: colors.muted,
      marginTop: -spacing.xs
    },
    fieldGroup: {
      gap: spacing.xs
    },
    label: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.muted,
      textTransform: 'uppercase',
      letterSpacing: 0.5
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 4,
      fontSize: 15,
      color: colors.ink,
      boxShadow: shadow.card
    },
    textarea: {
      minHeight: 90,
      textAlignVertical: 'top'
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm
    },
    chip: {
      borderWidth: 1.5,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs + 2
    },
    chipNeutral: {
      borderColor: colors.border,
      backgroundColor: colors.surface
    },
    chipNeutralActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary
    },
    chipText: {
      fontSize: 13,
      fontWeight: '700'
    },
    submit: {
      backgroundColor: colors.primary,
      borderRadius: radius.md,
      paddingVertical: spacing.md + 2,
      alignItems: 'center',
      marginTop: spacing.sm,
      boxShadow: shadow.raised
    },
    submitDisabled: {
      opacity: 0.45
    },
    submitText: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: '800'
    },
    cancelButton: {
      alignItems: 'center',
      paddingVertical: spacing.sm
    },
    cancelText: {
      color: colors.muted,
      fontSize: 14,
      fontWeight: '600'
    }
  })
