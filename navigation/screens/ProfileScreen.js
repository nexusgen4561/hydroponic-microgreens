import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="ios-arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Profile</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 28,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginLeft: 120,
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 60,
    },
});
