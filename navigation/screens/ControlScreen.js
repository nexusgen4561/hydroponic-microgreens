import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { db } from '../../config';
import { ref, onValue, set } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const [ledStatus, setLedStatus] = useState(false);

    useEffect(() => {
        // Create a reference to the "led_control" node in Firebase
        const ledControlRef = ref(db, 'led_control');

        // Listen for changes in the "led_control" value in Firebase
        onValue(ledControlRef, (snapshot) => {
            const newValue = snapshot.val();
            setLedStatus(newValue);
        });

        // Clean up the listener when the component unmounts
        return () => {
            // Unsubscribe from Firebase updates
            set(ledControlRef, false);
        };
    }, []);

    // Function to toggle the LED status in Firebase
    const toggleLedStatus = () => {
        const newStatus = !ledStatus;
        set(ref(db, 'led_control'), newStatus);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="ios-arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Monitor and Control</Text>
            </View>

            {/* LED Control */}
            <View style={styles.ledControlContainer}>
                <Text style={styles.ledControlLabel}>LED Control</Text>
                <Switch value={ledStatus} onValueChange={toggleLedStatus} />
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
        marginLeft: 75,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 20,
    },
    ledControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    ledControlLabel: {
        fontSize: 18,
    },
});
