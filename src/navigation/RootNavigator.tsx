import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native'

import { auth } from '../config/firebase'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectAuthLoading, selectCurrentUser, setUser, setUserPhoto } from '../features/auth/authSlice'
import { useAppTheme } from '../theme'

import AuthStack from './AuthStack'
import TabNavigator from './TabNavigator'

import { getUserProfile } from '../services/profile/profileService'

const RootNavigator = () => {
  const dispatch = useAppDispatch()
  const { navTheme, colors } = useAppTheme()

  const user = useAppSelector(selectCurrentUser)
  const isLoading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL ?? null
          })
        )

        try {
          const profile = await getUserProfile(firebaseUser.uid)
          if (profile?.photoURL) {
            dispatch(setUserPhoto(profile.photoURL))
          }
        } catch (error) {
          // Ignora silenciosamente si aún no existe el documento de perfil
        }
      } else {
        dispatch(setUser(null))
      }
    })

    return unsubscribe
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.canvas }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  return (
    <NavigationContainer theme={navTheme}>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default RootNavigator