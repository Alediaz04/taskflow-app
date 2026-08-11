import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, radius, spacing } from '../theme'

export default function TabBar() {
  return <View style={styles.bar} />
}

const styles = StyleSheet.create({
  bar: {
    height: 8,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft
  }
})
