import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, radius, shadow, spacing, screenStyles } from '../../theme'

const ProfileScreen = () => {
  return (
    <View style={screenStyles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tarjeta de Perfil / User Hero Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>AD</Text>
            <View style={styles.activeDot} />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>Alejandro Díaz</Text>
            <Text style={styles.userRole}>Desarrollador App • Mobile Dev</Text>
            <View style={styles.badgeRow}>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>⚡Miembro De TaskFlow </Text>
              </View>
            </View>
          </View>
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
    backgroundColor: colors.surface,
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
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  avatarText: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '800'
  },
  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: colors.surface
  },
  userInfo: {
    flex: 1,
    gap: 2
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.ink
  },
  userRole: {
    fontSize: 13,
    color: colors.muted
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 4
  },
  proBadge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.pill
  },
  proBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800'
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: -spacing.xs
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: 4,
    boxShadow: shadow.card
  },
  statNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: '600'
  },
  infoCard: {
    backgroundColor: colors.surface,
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
    gap: spacing.sm
  },
  infoLabel: {
    fontSize: 14,
    color: colors.ink,
    fontWeight: '600'
  },
  infoValue: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '700'
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md
  },
  roadmapCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary + '30'
  },
  roadmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2
  },
  roadmapTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary
  },
  roadmapText: {
    fontSize: 13,
    color: colors.ink,
    lineHeight: 19
  }
})
