import React, { useCallback, useState} from 'react'
import { StatusBar} from 'expo-status-bar'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { Task } from './src/types'
import { colors, spacing } from './src/theme'
import { SEED_TASKS } from './src/data/seed'

import FlatListScreen from './src/screens/FlatListScreen'
import TaskDetailScreen from './src/screens/TaskDetailScreen'
import TaskForm from './src/components/TaskForm'

// import HomeScreen from './src/screens/HomeScreen'

export default function App() {

  const [tasks, setTasks] = useState<Task[]> (SEED_TASKS)

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  /** Agregar una tarea al principio de la alista */
  const addTask = useCallback((task: Task) => {
    setTasks((prev: Task[]) => [task, ...prev])
  }, [])

  /** Alterna una tarea entere  completada o pendiente */
   const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )

    setSelectedTask((sel) => (sel && sel.id === id ? { ...sel, completed: !sel.completed } : sel))
  }, [])

  /** Elimina una tarea */
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))

    setSelectedTask(null)

  }, [])

  /**Abre detalle de una tarea */
  const openDetail = useCallback((task : Task) => setSelectedTask(task), [])

  /**Vuelve de la pantalla de detalle a la lista */
  const closeDetail = useCallback(() => setSelectedTask(null), [])

  /** INTERFAZ */
  return(
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <StatusBar style= "dark"/>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.screen}>
              <View>
                <Text style={styles.brand}> TaskFlow </Text>
                <Text style={styles.subtitle}> Lista, formulario y detalle </Text>
              </View>
            {selectedTask ? (
              <View style={styles.flex}>
                <TaskDetailScreen
                  task={selectedTask}
                  onBack={closeDetail}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </View>
            ) : (
              /** VISTA COMPLETA */
              <View style={styles.flex}>
                <FlatListScreen tasks={tasks} onToggle={toggleTask} onSelect={openDetail} />
                <TaskForm onAdd={addTask} />
              </View>
            )}
          </View>

        </KeyboardAvoidingView>

      </SafeAreaView>

    </SafeAreaProvider>

  )
}

const styles = StyleSheet.create ( {

  flex: { 
    flex: 1
  },
  safe: {
    flex: 1,
    backgroundColor: colors.canvas

  },
  screen: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg
  },
  brand: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: spacing.xs
  }
})


// codigo de antes (entrega 3)
// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <HomeScreen />
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundColor,
//     gap: 24
//   }
// })
