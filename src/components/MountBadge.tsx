import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, radius, spacing } from '../theme'

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
    const good = mounted <= total / 2

  return ( <View style={[styles.badge, good ? styles.good : styles.bad]}>
      <Text style={[styles.text, good ? styles.goodText : styles.badText]}>
        {good ? '⚡' : '🐢'} {mounted} de {total} ítems montados en memoria
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
  good: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success
  },
  bad: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger
  },
  text: {
    fontSize: 12,
    fontWeight: '700'
  },
  goodText: { color: colors.success },
  badText: { color: colors.danger }
})