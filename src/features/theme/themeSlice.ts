import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface ThemeState {
  isDark: boolean
}

const initialState: ThemeState = {
  isDark: false
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

export const selectIsDark = (state: RootState) => state.theme.isDark
