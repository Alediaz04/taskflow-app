import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import CompletionModal from '../../components/CompletionModal'
import EmptyState from '../../components/EmptyState'
import MountBadge, { useMountCounter } from '../../components/MountBadge'
import TaskItem from '../../components/TaskItem'
import { radius, shadow, spacing, screenStyles, useAppTheme, AppColors } from '../../theme'
import { Task } from '../../types'
import { RootStackParamList } from '../../navigation/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  FilterId,
  selectAllTasks,
  selectFilter,
  selectFilteredTasks,
  setFilter,
  toggleTaskStatus
} from '../../features/tasks/tasksSlice'

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>

type FilterOption = {
  id: FilterId
  label: string
  emoji: string
}

const FILTERS: FilterOption[] = [
  { id: 'all', label: 'Todas', emoji: '📋' },
  { id: 'today', label: 'Hoy', emoji: '📅' },
  { id: 'completed', label: 'Completadas', emoji: '✅' },
  { id: 'trabajo', label: 'Trabajo', emoji: '💼' },
  { id: 'estudio', label: 'Estudio', emoji: '📚' },
  { id: 'personal', label: 'Personal', emoji: '🌱' },
  { id: 'hogar', label: 'Hogar', emoji: '🏠' }
]

const keyExtractor = (item: Task) => item.id

const TasksScreen = ({ navigation }: Props) => {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)

  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectAllTasks)
  const filteredTasks = useAppSelector(selectFilteredTasks)
  const activeFilter = useAppSelector(selectFilter)

  const { mounted, onMountChange } = useMountCounter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const hasSeenCompletionRef = useRef(false)
  const prevPendingRef = useRef<number | null>(null)

  const pending = tasks.filter((t) => !t.completed).length
  const completed = tasks.length - pending
  const progressPercent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0

  useEffect(() => {
    const isAllDone = tasks.length > 0 && pending === 0
    const prevPending = prevPendingRef.current

    if (isAllDone) {
      if (!hasSeenCompletionRef.current && (prevPending === null || prevPending > 0)) {
        setShowCompletionModal(true)
      }
    } else {
      hasSeenCompletionRef.current = false
      setShowCompletionModal(false)
    }

    prevPendingRef.current = pending
  }, [tasks.length, pending])

  const handleCloseCompletionModal = useCallback(() => {
    hasSeenCompletionRef.current = true
    setShowCompletionModal(false)
  }, [])

  const activeOption = FILTERS.find((f) => f.id === activeFilter) || FILTERS[0]

  /** Cantidad de tareas por filtro */
  const getFilterCount = (filterId: FilterId) => {
    if (filterId === 'all') return tasks.length
    if (filterId === 'today') return tasks.filter((t) => t.date === 'today').length
    if (filterId === 'completed') return tasks.filter((t) => t.completed).length
    return tasks.filter((t) => t.category === filterId).length
  }

  /** Abre el detalle de una tarea navegando al stack (solo viaja el id) */
  const openDetail = useCallback(
    (task: Task) => {
      navigation.navigate('TaskDetail', { taskId: task.id })
    },
    [navigation]
  )

  const handleToggle = useCallback(
    (id: string) => {
      dispatch(toggleTaskStatus(id))
    },
    [dispatch]
  )

  const renderItem = useCallback(
    ({ item }: { item: Task }) => {
      return (
        <TaskItem
          task={item}
          onToggle={handleToggle}
          onPress={openDetail}
          onMountChange={onMountChange}
        />
      )
    },
    [handleToggle, openDetail, onMountChange]
  )

  return (
    <View style={[screenStyles.container, { backgroundColor: colors.canvas }]}>
      <View>
        <Text style={styles.brand}>TaskFlow</Text>
        <Text style={styles.appSubtitle}>Lista, formulario y detalle</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          {/* Fila del Título y Dropdown Desplegable */}
          <View style={styles.titleRow}>
            <View style={styles.titleWithBadge}>
              <Text style={styles.title}>Mis tareas</Text>
              <View style={styles.counter}>
                <Text style={styles.counterText}>{pending}</Text>
              </View>
            </View>

            {/* Botón Menú Desplegable */}
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => setIsDropdownOpen(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.dropdownTriggerText}>
                {activeOption.emoji} {activeOption.label} ({getFilterCount(activeFilter)})
              </Text>
              <Text style={styles.dropdownChevron}>▾</Text>
            </TouchableOpacity>
          </View>

          {/* Tarjeta de Progreso General */}
          {tasks.length > 0 && (
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progreso general</Text>
                <Text style={styles.progressPercentText}>{progressPercent}%</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
              </View>
              <Text style={styles.progressSubtext}>
                {completed} de {tasks.length} tareas completadas
              </Text>
            </View>
          )}

          {tasks.length > 0 && <MountBadge mounted={mounted} total={tasks.length} />}
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            tasks.length === 0 ? (
              <EmptyState />
            ) : (
              <EmptyState
                title="Sin tareas en este filtro"
                subtitle="Probá cambiando el filtro en el menú desplegable de arriba."
              />
            )
          }
          initialNumToRender={8}
          windowSize={7}
          maxToRenderPerBatch={8}
        />

        {/* Modal Menú Desplegable de Filtros */}
        <Modal
          visible={isDropdownOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsDropdownOpen(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setIsDropdownOpen(false)}>
            <View style={styles.modalMenu}>
              <Text style={styles.modalTitle}>Filtrar tareas por</Text>
              {FILTERS.map((f) => {
                const isActive = activeFilter === f.id
                const count = getFilterCount(f.id)
                return (
                  <TouchableOpacity
                    key={f.id}
                    style={[styles.menuOption, isActive && styles.menuOptionActive]}
                    onPress={() => {
                      dispatch(setFilter(f.id))
                      setIsDropdownOpen(false)
                    }}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.menuOptionText, isActive && styles.menuOptionTextActive]}>
                      {f.emoji} {f.label}
                    </Text>
                    <View style={[styles.menuBadge, isActive && styles.menuBadgeActive]}>
                      <Text style={[styles.menuBadgeText, isActive && styles.menuBadgeTextActive]}>
                        {count} {count === 1 ? 'tarea' : 'tareas'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </Pressable>
        </Modal>
      </View>

      <TouchableOpacity
        style={styles.fabRow}
        onPress={() => navigation.navigate('TaskForm')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabPlus}>＋</Text>
        <Text style={styles.fabText}>Nueva tarea</Text>
      </TouchableOpacity>

      <CompletionModal
        visible={showCompletionModal}
        onClose={handleCloseCompletionModal}
      />
    </View>
  )
}

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
    brand: {
      fontSize: 24,
      fontWeight: '900',
      color: colors.ink,
      letterSpacing: -0.5
    },
    appSubtitle: {
      fontSize: 14,
      color: colors.muted,
      marginTop: spacing.xs
    },
    container: {
      flex: 1,
      gap: spacing.sm
    },
    header: {
      gap: spacing.xs
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    titleWithBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs + 2
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.ink
    },
    counter: {
      backgroundColor: colors.primarySoft,
      minWidth: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 6
    },
    counterText: {
      color: colors.primary,
      fontWeight: '800',
      fontSize: 13
    },
    dropdownTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.surface,
      borderWidth: 1.5,
      borderColor: colors.primary,
      paddingHorizontal: spacing.sm + 2,
      paddingVertical: spacing.xs,
      borderRadius: radius.pill,
      boxShadow: shadow.card
    },
    dropdownTriggerText: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.primary
    },
    dropdownChevron: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.primary,
      marginTop: -2
    },
    progressCard: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      padding: spacing.sm + 2,
      gap: 4,
      boxShadow: shadow.card,
      marginTop: 4
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    progressLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.ink
    },
    progressPercentText: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.primary
    },
    progressBarTrack: {
      height: 6,
      backgroundColor: colors.canvas,
      borderRadius: radius.pill,
      overflow: 'hidden',
      marginVertical: 2
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: radius.pill
    },
    progressSubtext: {
      fontSize: 11,
      color: colors.muted
    },
    listContent: {
      paddingBottom: spacing.xl,
      flexGrow: 1
    },
    /* Modal Desplegable */
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg
    },
    modalMenu: {
      width: '100%',
      maxWidth: 320,
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      padding: spacing.lg,
      gap: spacing.xs,
      boxShadow: shadow.raised
    },
    modalTitle: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.muted,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: spacing.xs
    },
    menuOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md
    },
    menuOptionActive: {
      backgroundColor: colors.primarySoft
    },
    menuOptionText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.ink
    },
    menuOptionTextActive: {
      color: colors.primary,
      fontWeight: '800'
    },
    menuBadge: {
      backgroundColor: colors.canvas,
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: radius.pill
    },
    menuBadgeActive: {
      backgroundColor: colors.primary
    },
    menuBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.muted
    },
    menuBadgeTextActive: {
      color: colors.surface,
      fontWeight: '800'
    },
    fabRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      backgroundColor: colors.primary,
      borderRadius: radius.lg,
      paddingVertical: spacing.md + 2,
      boxShadow: shadow.raised
    },
    fabPlus: {
      color: colors.surface,
      fontSize: 18,
      fontWeight: '800'
    },
    fabText: {
      color: colors.surface,
      fontSize: 15,
      fontWeight: '800'
    }
  })

export default TasksScreen
