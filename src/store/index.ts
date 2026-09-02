import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../features/tasks/tasksSlice'
import themeReducer from '../features/theme/themeSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore ({
        reducer: {
            tasks: tasksReducer,
            theme: themeReducer,
            auth: authReducer
        }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch