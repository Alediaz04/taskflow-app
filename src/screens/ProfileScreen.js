import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { theme } from '../constants/theme';
import avatar from '../assets/avatar.webp'

export default function ProfileScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.screenTitle}> Mi perfil </Text>
            <ProfileCard
            name= "Alejandro"
            role="Software Developer"
            image= {avatar}
            />
        </View>
    );

}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 30,
  }
});