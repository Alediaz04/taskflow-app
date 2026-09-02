import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'

import { db } from '../../config/firebase'
import type { Task } from '../../types'

export type NewTaskData = Omit<Task, 'id'>

/** Crea una tarea en la colección "tasks", asociada al usuario dueño */
export const createTask = async (task: NewTaskData, userId: string) => {
  await addDoc(collection(db, 'tasks'), {
    ...task,
    userId,
    createdAt: serverTimestamp()
  })
}

/**
 * Suscribe en tiempo real a las tareas de un usuario. Cada vez que cambia
 * algo en Firestore (propio o de otro dispositivo), llama a `callback` con
 * la lista actualizada. Devuelve una función para cortar la suscripción
 * (hay que llamarla en el cleanup del useEffect que la use).
 */
export const subscribeToTasks = (userId: string, callback: (tasks: Task[]) => void) => {
  const tasksQuery = query(collection(db, 'tasks'), where('userId', '==', userId))

  return onSnapshot(tasksQuery, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((document) => {
      const data = document.data()
      return {
        id: document.id,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        completed: data.completed
      }
    })

    callback(tasks)
  })
}

export const updateTaskStatus = async (taskId: string, completed: boolean) => {
  const taskRef = doc(db, 'tasks', taskId)
  await updateDoc(taskRef, { completed })
}

export const removeTask = async (taskId: string) => {
  const taskRef = doc(db, 'tasks', taskId)
  await deleteDoc(taskRef)
}