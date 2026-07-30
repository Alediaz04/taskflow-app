import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { theme } from '../constants/theme';

export default function ProfileCard({ name, role, image }) {
    return (
        <View style= {styles.cardContainer}>
            <Image
                source={image}
                style={styles.avatar}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.roleText}>{role}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        padding: 20,
        borderRadiu: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        marginVertical: 10,
        width: '90%',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    infoContainer: {
        marginLeft: 20,
        flex: 1,
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    roleText: {
        fontSize: 16,
        color: theme.colors.primary,
        fontWeight: '500',
    },

});