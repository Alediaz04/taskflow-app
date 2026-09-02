import React, { useState } from 'react'
import { Alert, ActivityIndicator, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { radius, shadow, spacing, screenStyles, useAppTheme } from '../../theme'
import { useAppSelector } from '../../store/hooks'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { logout } from '../../services/auth/authService'

const ProfileScreen = () => {
  const { colors, isDark, toggleTheme } = useAppTheme()
  const user = useAppSelector(selectCurrentUser)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '800' }}>{getInitials()}</Text>
            <View style={[styles.activeDot, { backgroundColor: colors.success, borderColor: colors.surface }]} />
          </View>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.ink }]}>{displayName}</Text>
            <Text style={[styles.userRole, { color: colors.muted }]}>{userEmail}</Text>
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
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2
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
