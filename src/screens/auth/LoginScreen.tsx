import React, { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { radius, shadow, spacing, screenStyles, useAppTheme, AppColors } from '../../theme'
import { AuthStackParamList } from '../../navigation/types'
import { signIn } from '../../services/auth/authService'

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>

const LoginScreen = ({ navigation }: Props) => {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async () => {
    setError('')

    if (!email.trim() || !password) {
      setError('Por favor, ingresa tu correo y contraseña.')
      return
    }

    setIsSubmitting(true)
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      console.error(err)
      setError('Correo o contraseña incorrectos. Verifícalos e intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={[screenStyles.container, { backgroundColor: colors.canvas }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header con Branding / Hero */}
        <View style={styles.header}>
          <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="checkbox" size={32} color="#FFFFFF" />
          </View>
          <Text style={[styles.brandTitle, { color: colors.ink }]}>TaskFlow</Text>
          <Text style={[styles.brandSubtitle, { color: colors.muted }]}>
            Organiza tu día, alcanza tus metas
          </Text>
        </View>

        {/* Tarjeta de Formulario Elevada */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.formTitle, { color: colors.ink }]}>¡Hola de nuevo! 👋</Text>
          <Text style={[styles.formSubtitle, { color: colors.muted }]}>
            Ingresa a tu cuenta para continuar
          </Text>

          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.ink }]}>Correo electrónico</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.canvas, borderColor: colors.border }]}>
              <Ionicons name="mail-outline" size={20} color={colors.muted} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.ink }]}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Campo Contraseña */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.ink }]}>Contraseña</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.canvas, borderColor: colors.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.muted} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.ink }]}
                placeholder="••••••••"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.muted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Mensaje de Error Banner */}
          {error ? (
            <View style={[styles.errorBanner, { backgroundColor: colors.dangerSoft }]}>
              <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
              <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
            </View>
          ) : null}

          {/* Botón Principal */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }, isSubmitting && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          {/* Enlace a Registro */}
          <View style={styles.footerLinkRow}>
            <Text style={[styles.footerText, { color: colors.muted }]}>¿No tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.footerLink, { color: colors.primary }]}> Regístrate</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: spacing.xl,
      gap: spacing.lg
    },
    header: {
      alignItems: 'center',
      gap: 6
    },
    logoBadge: {
      width: 64,
      height: 64,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xs,
      boxShadow: shadow.card
    },
    brandTitle: {
      fontSize: 30,
      fontWeight: '900',
      letterSpacing: -0.5
    },
    brandSubtitle: {
      fontSize: 14,
      fontWeight: '500'
    },
    card: {
      borderRadius: radius.xl,
      padding: spacing.xl,
      boxShadow: shadow.card,
      gap: spacing.md
    },
    formTitle: {
      fontSize: 22,
      fontWeight: '800'
    },
    formSubtitle: {
      fontSize: 13,
      marginTop: -spacing.xs,
      marginBottom: spacing.xs
    },
    inputContainer: {
      gap: spacing.xs
    },
    inputLabel: {
      fontSize: 13,
      fontWeight: '700'
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      height: 50
    },
    inputIcon: {
      marginRight: spacing.xs + 2
    },
    input: {
      flex: 1,
      fontSize: 15,
      height: '100%'
    },
    errorBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      padding: spacing.md,
      borderRadius: radius.md
    },
    errorText: {
      flex: 1,
      fontSize: 13,
      fontWeight: '600'
    },
    primaryButton: {
      flexDirection: 'row',
      height: 52,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
      marginTop: spacing.xs,
      boxShadow: shadow.card
    },
    buttonDisabled: {
      opacity: 0.65
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '800'
    },
    footerLinkRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.xs
    },
    footerText: {
      fontSize: 14
    },
    footerLink: {
      fontSize: 14,
      fontWeight: '800'
    }
  })