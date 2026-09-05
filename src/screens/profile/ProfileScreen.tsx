import React, { useState } from 'react'
import { Alert, ActivityIndicator, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { radius, shadow, spacing, screenStyles, useAppTheme } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectCurrentUser, setUserPhoto } from '../../features/auth/authSlice'
import { logout } from '../../services/auth/authService'
import { updateUserPhoto } from '../../services/profile/profileService'

const ProfileScreen = () => {
  const { colors, isDark, toggleTheme } = useAppTheme()
  const user = useAppSelector(selectCurrentUser)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const dispatch = useAppDispatch()
  const [isSavingPhoto, setIsSavingPhoto] = useState(false)

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu galería para cambiar la foto de perfil.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7
    })

    if (result.canceled) return

    await savePhoto(result.assets[0].uri)
  }

  const savePhoto = async (photoURL: string) => {
    setIsSavingPhoto(true)
    try {
      dispatch(setUserPhoto(photoURL))
      if (user) {
        await updateUserPhoto(user.uid, photoURL)
      }
    } catch (error) {
      console.error('Error al guardar la foto en Firestore:', error)
    } finally {
      setIsSavingPhoto(false)
    }
  }

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas salir de tu cuenta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoggingOut(true)
              await logout()
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar la sesión. Inténtalo de nuevo.')
            } finally {
              setIsLoggingOut(false)
            }
          }
        }
      ]
    )
  }

  const getInitials = () => {
    if (user?.displayName) {
      const parts = user.displayName.trim().split(' ')
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
      }
      return user.displayName.substring(0, 2).toUpperCase()
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return 'TF'
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Usuario'
  const userEmail = user?.email || 'Sin correo registrado'

  return (
    <View style={[screenStyles.container, { backgroundColor: colors.canvas }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tarjeta de Perfil / User Hero Card */}
        <View style={[styles.userCard, { backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage} disabled={isSavingPhoto} activeOpacity={0.85}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
                <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '800' }}>{getInitials()}</Text>
              </View>
            )}

            {isSavingPhoto ? (
              <View style={styles.avatarOverlay}>
                <ActivityIndicator color="#FFFFFF" size="small" />
              </View>
            ) : (
              <View style={[styles.avatarBadge, { backgroundColor: colors.primary, borderColor: colors.surface }]}>
                <Ionicons name="camera" size={12} color="#FFFFFF" />
              </View>
            )}

            <View style={[styles.activeDot, { backgroundColor: colors.success, borderColor: colors.surface }]} />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.ink }]}>{displayName}</Text>
            <Text style={[styles.userRole, { color: colors.muted }]}>{userEmail}</Text>
            <Text style={[styles.avatarHint, { color: colors.muted }]}>Tocá la foto para cambiarla</Text>

            <View style={styles.badgeRow}>
              <View style={[styles.proBadge, { backgroundColor: colors.primarySoft }]}>
                <Text style={[styles.proBadgeText, { color: colors.primary }]}>⚡ Miembro de TaskFlow</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sección Ajustes de Apariencia / Dark Mode */}
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>Apariencia</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons
                name={isDark ? 'moon' : 'sunny'}
                size={22}
                color={isDark ? colors.primary : '#F59E0B'}
              />
              <View>
                <Text style={[styles.infoLabel, { color: colors.ink }]}>
                  {isDark ? 'Modo Nocturno' : 'Modo Claro'}
                </Text>
                <Text style={[styles.infoSubtext, { color: colors.muted }]}>
                  {isDark ? 'Tema azul oscuro activado' : 'Tema claro activo por defecto'}
                </Text>
              </View>
            </View>

            <Switch
              value={isDark}
              onValueChange={() => {
                toggleTheme()
              }}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </View>

        {/* Sección Cuenta / Session */}
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>Cuenta</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleLogout}
            disabled={isLoggingOut}
            activeOpacity={0.7}
          >
            <View style={styles.infoLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.dangerSoft }]}>
                <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              </View>
              <View>
                <Text style={[styles.infoLabel, { color: colors.danger }]}>
                  Cerrar sesión
                </Text>
                <Text style={[styles.infoSubtext, { color: colors.muted }]}>
                  Salir de tu cuenta actual
                </Text>
              </View>
            </View>

            {isLoggingOut ? (
              <ActivityIndicator color={colors.danger} size="small" />
            ) : (
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl
  },
  userCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    boxShadow: shadow.card
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    position: 'relative'
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // activeDot: cambiá bottom:2/right:2 por esto, para que no pise el badge de cámara:
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    top: -1,
    right: -1,
    borderWidth: 2
  },
  // y agregá junto a userRole:
  avatarHint: {
    fontSize: 11,
    fontWeight: '600'
  },
  userInfo: {
    flex: 1,
    gap: 2
  },
  userName: {
    fontSize: 18,
    fontWeight: '800'
  },
  userRole: {
    fontSize: 13
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 4
  },
  proBadge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.pill
  },
  proBadgeText: {
    fontSize: 11,
    fontWeight: '800'
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: -spacing.xs
  },
  infoCard: {
    borderRadius: radius.md,
    padding: spacing.lg,
    boxShadow: shadow.card
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '700'
  },
  infoSubtext: {
    fontSize: 12,
    marginTop: 2
  }
})
