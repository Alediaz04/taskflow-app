import { Task } from '../types'

export type RootStackParamList = {
  TaskList: undefined
  TaskDetail: {
    taskId: string
    task?: Task
  }
  TaskForm: undefined
}
