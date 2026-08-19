import { useCallback, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TasksScreen from '../screens/tasks/TasksScreen'
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen'
import TaskFormScreen from '../screens/tasks/TaskFormScreen'
import { Task } from '../types'
import { SEED_TASKS } from '../data/seed'

import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const TaskStack = () => {
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS)

  /** Agregar una tarea al principio de la lista */
  const addTask = useCallback((task: Task) => {
    setTasks((prev: Task[]) => [task, ...prev])
  }, [])

  /** Alterna una tarea entre completada o pendiente */
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  /** Elimina una tarea */
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <Stack.Navigator
      initialRouteName="TaskList"
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Atrás',
      }}>
      <Stack.Screen name="TaskList" options={{ title: 'Mis tareas' }}>
        {(props) => (
          <TasksScreen {...props} tasks={tasks} onToggle={toggleTask} onAdd={addTask} />
        )}
      </Stack.Screen>
      <Stack.Screen name="TaskDetail" options={{ title: 'Detalles de la tarea' }}>
        {(props) => (
          <TaskDetailScreen
            {...props}
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="TaskForm"
        options={{ title: 'Nueva Tarea', presentation: 'card' }}
      >
        {(props) => <TaskFormScreen {...props} onAdd={addTask} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default TaskStack
