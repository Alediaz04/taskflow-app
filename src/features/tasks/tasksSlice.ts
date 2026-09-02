import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Category, Task } from '../../types'
import { createId } from '../../types'
import type { RootState } from '../../store'

export type FilterId = 'all' | 'today' | 'completed' | Category

export type NewTaskInput = Omit<Task, 'id' | 'completed' > 

type TasksState = {
    items: Task[]
    filter: FilterId
}

const initialState: TasksState = {
    items: [],
    filter: 'all'
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        addTask: { 
            prepare: (input: NewTaskInput) => ({
                payload: { id: createId(), completed: false, ...input } as Task
            }),
            reducer: (state, action: PayloadAction<Task>) => {
                state.items.unshift(action.payload)
            }
        },
        toggleTaskStatus: (state, action: PayloadAction<string>) => {
            const task = state.items.find((t) => t.id === action.payload)
            if (task) {
                task.completed = !task.completed
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((t) => t.id !== action.payload)
        },
        setFilter: (state, action: PayloadAction<FilterId>) => {
            state.filter = action.payload
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.items = action.payload
        }
    }
})

export const { addTask, toggleTaskStatus, deleteTask, setTasks, setFilter } = tasksSlice.actions
export default tasksSlice.reducer
// Selectores

export const selectAllTasks = (state: RootState) => state.tasks.items
export const selectedAllTasks = selectAllTasks
export const selectFilter = (state: RootState) => state.tasks.filter

export const selectTaskById = (id: string | undefined) => (state: RootState) => 
    id ? state.tasks.items.find((t) => t.id === id) : undefined
export const selectedTaskById = selectTaskById

export const selectFilteredTasks = createSelector(
    [selectedAllTasks, selectFilter],
    (items, filter) => {
        return items.filter((task) => {
            if (filter === 'all') return true
            if (filter === 'today') return task.date === 'today'
            if (filter === 'completed') return task.completed
            return task.category === filter
        })
    }
)