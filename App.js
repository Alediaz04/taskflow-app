import React from 'react';
import { StyleShet, Text, View } from 'react-native';

export default function App() { 
    return ( 
        <View style = { styles.container}>
            <Text style= {styles.title} > TASKFLOW </Text>
            <Text style= {styles.subtitle} > Estructura Base </Text>
            <Text style= {styles.status} > Estructura de la base completa </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#0F172A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: { 
        fontSize: 36,
        fontWeight: 'bold',
        color: '#38BDF8',
        marginBottom: 8,
    },
    subtitle: { 
        fontSize: 18,
        color: '#94A3B8',
        marginBottom: 24,

    },
    status: {
        fontSize: 14,
        color: '#4ADE80',
        fontWeight: '600',
    },

});

