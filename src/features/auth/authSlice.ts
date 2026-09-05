import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export type AuthUser = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL?: string | null
}

type AuthState = {
  user: AuthUser | null
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
    },
    setUserPhoto: (state, action: PayloadAction<string | null>) => {
      if (state.user) {
        state.user.photoURL = action.payload
      }
    }
  }
})

export const { setUser, setUserPhoto } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectAuthLoading = (state: RootState) => state.auth.isLoading
export const selectUserPhoto = (state: RootState) => state.auth.user?.photoURL ?? null


