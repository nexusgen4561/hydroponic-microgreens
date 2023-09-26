import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { db } from '../../config';
import { ref, onValue } from 'firebase/database';

export default function DataLogScreen({ navigation }) {
    const [readingsData, setReadingsData] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        const starCountRef = ref(db, 'readings');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newReadings = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            // Sort data by most recent timestamp
            newReadings.sort((a, b) => b.Timestamp - a.Timestamp);
            setReadingsData(newReadings);
        });
    }, []);

    const toggleExpand = (item) => {
        if (expandedItem === item.id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(item.id);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Sensor Data Log</Text>
            </View>

            <View style={styles.listContainer}>
                {readingsData.map((item, index) => (
                    <TouchableOpacity key={item.id} onPress={() => toggleExpand(item)}>
                        <View style={styles.listItem}>
                            <Text style={styles.timestamp}>{item.Timestamp}</Text>
                            {expandedItem === item.id && (
                                <View style={styles.details}>
                                    <Text style={styles.detailText}>Status: {item.Status}</Text>
                                    <Text style={styles.detailText}>Temperature: {item.Temperature}</Text>
                                    <Text style={styles.detailText}>pH Value: {item.pH_Value}</Text>
                                    <Text style={styles.detailText}>tds Value: {item.tds_Value}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Use your desired background color here
        marginTop: 28,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        color: 'black', // Font color set to white
    },
    listContainer: {
        flex: 1,
        marginTop: 30,
        paddingLeft: 24,
        paddingRight: 24,
    },
    listItem: {
        borderBottomWidth: 1,
        borderColor: '#C1C0B9',
        paddingVertical: 10,
    },
    timestamp: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', // Font color set to white
    },
    details: {
        marginTop: 10,
    },
    detailText: {
        color: 'black', // Font color set to white
    },
    backButton: {
        marginLeft: 24,
        maxWidth: 20,
        color: 'black', // Font color set to white
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
});
