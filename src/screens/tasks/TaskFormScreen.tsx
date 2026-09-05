import React, { useEffect, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { CATEGORIES, Category, CustomCategory, DueDate, DUE_DATES, getCategoryMeta } from '../../types'
import { radius, shadow, spacing, screenStyles, useAppTheme, AppColors } from '../../theme'
import { RootStackParamList } from '../../navigation/types'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { createTask } from '../../services/tasks/tasksService'
import { addCustomCategory, subscribeToCustomCategories } from '../../services/categories/categoriesService'

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>

const DEFAULT_CATEGORY_KEYS = Object.keys(CATEGORIES)
const DATE_KEYS = Object.keys(DUE_DATES) as DueDate[]
const EMOJI_OPTIONS = ['🏋️', '💰', '🎨', '✈️', '🛒', '💡', '🍔', '🚗', '📚', '🌱', '🏷️']

export default function TaskFormScreen({ navigation }: Props) {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)

  const user = useAppSelector(selectCurrentUser)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('personal')
  const [date, setDate] = useState<DueDate>('today')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatEmoji, setNewCatEmoji] = useState('🏋️')
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)

  useEffect(() => {
    if (!user) return
    const unsubscribe = subscribeToCustomCategories(user.uid, (cats) => {
      setCustomCategories(cats)
    })
    return unsubscribe
  }, [user])

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

  const handleCreateCategory = async () => {
    if (!newCatName.trim() || !user) return

    setIsCreatingCategory(true)
    try {
      const created = await addCustomCategory(user.uid, {
        label: newCatName.trim(),
        emoji: newCatEmoji
      })
      setCategory(created.id)
      setNewCatName('')
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Error al crear categoría:', error)
      Alert.alert('Error', 'No se pudo guardar la nueva categoría.')
    } finally {
      setIsCreatingCategory(false)
    }
  }

  // Combinar categorías por defecto con las personalizadas del usuario
  const allCategoryList = [
    ...DEFAULT_CATEGORY_KEYS.map((key) => ({
      key,
      meta: CATEGORIES[key]
    })),
    ...customCategories.map((c) => ({
      key: c.id,
      meta: {
        label: c.label,
        color: c.color,
        soft: c.soft,
        emoji: c.emoji
      }
    }))
  ]

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
            {allCategoryList.map(({ key, meta }) => {
              const active = category === key

              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.chip,
                    { borderColor: meta.color },
                    active && { backgroundColor: meta.color }
                  ]}
                  onPress={() => setCategory(key)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, { color: active ? '#FFFFFF' : meta.color }]}>
                    {meta.emoji} {meta.label}
                  </Text>
                </TouchableOpacity>
              )
            })}

            {/* Botón de Agregar Categoría (+) */}
            <TouchableOpacity
              style={[styles.chip, styles.chipAdd]}
              onPress={() => setIsAddModalOpen(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, { color: colors.primary }]}>＋ Nueva</Text>
            </TouchableOpacity>
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

      {/* Modal para Crear Nueva Categoría */}
      <Modal
        visible={isAddModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsAddModalOpen(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Nueva Categoría Personalizada</Text>
            <Text style={styles.modalSubtext}>
              Escribí el nombre y elegí un ícono para clasificar tus tareas.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. Gimnasio, Finanzas, Mascotas"
              placeholderTextColor={colors.muted}
              value={newCatName}
              onChangeText={setNewCatName}
              autoFocus
            />

            <Text style={styles.emojiLabel}>Elegí un ícono:</Text>
            <View style={styles.emojiGrid}>
              {EMOJI_OPTIONS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.emojiItem,
                    newCatEmoji === emoji && { backgroundColor: colors.primarySoft, borderColor: colors.primary }
                  ]}
                  onPress={() => setNewCatEmoji(emoji)}
                >
                  <Text style={{ fontSize: 20 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => setIsAddModalOpen(false)}
              >
                <Text style={{ color: colors.muted, fontWeight: '700' }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  styles.modalBtnSave,
                  (!newCatName.trim() || isCreatingCategory) && { opacity: 0.5 }
                ]}
                onPress={handleCreateCategory}
                disabled={!newCatName.trim() || isCreatingCategory}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>
                  {isCreatingCategory ? 'Guardando...' : 'Crear'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    chipAdd: {
      borderColor: colors.primary,
      borderStyle: 'dashed',
      backgroundColor: colors.primarySoft
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
    },
    /* Modal de Nueva Categoría */
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg
    },
    modalContent: {
      width: '100%',
      maxWidth: 340,
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      padding: spacing.lg,
      gap: spacing.md,
      boxShadow: shadow.raised
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.ink
    },
    modalSubtext: {
      fontSize: 13,
      color: colors.muted,
      marginTop: -spacing.xs
    },
    emojiLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.muted,
      textTransform: 'uppercase'
    },
    emojiGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs + 2
    },
    emojiItem: {
      width: 40,
      height: 40,
      borderRadius: radius.md,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: spacing.sm,
      marginTop: spacing.xs
    },
    modalBtn: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 2,
      borderRadius: radius.md
    },
    modalBtnCancel: {
      backgroundColor: colors.canvas
    },
    modalBtnSave: {
      backgroundColor: colors.primary
    }
  })

