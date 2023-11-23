import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../config';
import { ref, onValue } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

export default function DataLogScreen({ navigation }) {
    const [readingsData, setReadingsData] = useState([]);
    const [expandedItems, setExpandedItems] = useState([]);
    const flatListRef = useRef(null);

    useEffect(() => {
        const starCountRef = ref(db, 'readings5');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newReadings = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            // Sort data by most recent timestamp in reverse order
            newReadings.sort((a, b) => b.timestamp - a.timestamp);
            setReadingsData(newReadings);
        });
    }, []);

    // Function to toggle item expansion
    const toggleExpand = (itemId) => {
        if (expandedItems.includes(itemId)) {
            setExpandedItems(expandedItems.filter((id) => id !== itemId));
        } else {
            setExpandedItems([...expandedItems, itemId]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="ios-arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.header}>Sensor Data Log</Text>
            </View>

            <FlatList
                style={{ flex: 1, marginTop: 16 }}
                ref={flatListRef}
                data={readingsData.slice().reverse()} // Reverse the order of the data
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                        <View style={styles.listItem}>
                            <Text style={styles.timestamp}>{item.Timestamp}</Text>
                            {expandedItems.includes(item.id) && (
                                <View style={styles.details}>
                                    <Text style={styles.detailText}>Status: {item.Status}</Text>
                                    <Text style={styles.detailText}>Temperature: {item.Temperature}</Text>
                                    <Text style={styles.detailText}>pH Value: {item.pH_Value}</Text>
                                    <Text style={styles.detailText}>tds Value: {item.tds_Value}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16, // Add padding to all sides
        marginTop: 32, // Add margin from the top
        backgroundColor: '#3b4d36',
        borderRadius: 4,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        marginLeft: 75,
        flex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    listItem: {
        backgroundColor: 'white', // Add a background color to each list item
        borderRadius: 8, // Add rounded corners
        elevation: 2, // Add a shadow
        marginBottom: 16, // Add margin at the bottom of each item
        padding: 16, // Add padding to all sides
    },
    timestamp: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    details: {
        marginTop: 10,
    },
    detailText: {
        color: 'black',
    },
    backButton: {
        maxWidth: 50,
        alignItems: 'flex-start',
        marginLeft: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
});
