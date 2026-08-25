import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { radius, spacing, useAppTheme } from '../theme'

export function useMountCounter() {
  const [mounted, setMounted] = useState(0)
  const onMountChange = useCallback(() => {
    setMounted((prev) => prev + 1)
    return () => setMounted((prev) => prev - 1)
  }, [])
  return { mounted, onMountChange }
}

type Props = {
  mounted: number
  total: number
}

export default function MountBadge({ mounted, total }: Props) {
  const { colors } = useAppTheme()

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.successSoft,
          borderColor: colors.success
        }
      ]}
    >
      <Text style={[styles.text, { color: colors.success }]}>
        ☁️ Guardado Correctamente
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.pill,
    borderWidth: 1
  },
  text: {
    fontSize: 12,
    fontWeight: '700'
  }
})