import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export type AuthUser = {
  uid: string
  email: string | null
  displayName: string | null
}

type AuthState = {
  user: AuthUser | null
  // arranca en true: todavía no sabemos si hay sesión o no hasta que
  // onAuthStateChanged (en RootNavigator) responda por primera vez
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload
      state.isLoading = false
    }
  }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectAuthLoading = (state: RootState) => state.auth.isLoading