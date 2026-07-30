import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function HomeScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}> Pantalla de inicio de Task Flow </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgrounColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: theme.colors.text,
        fontSize: 18,

    }
});
