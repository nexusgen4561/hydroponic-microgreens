import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { db } from '../../config';
import { ref, onValue } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

export default function DataLogScreen({ navigation }) {
    const [readingsData, setReadingsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [expandedItems, setExpandedItems] = useState([]);

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

    // Calculate the range of items to display for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = readingsData.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

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
                    <Ionicons name="ios-arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Sensor Data Log</Text>
            </View>

            <ScrollView>
                <View style={styles.listContainer}>
                    {currentItems.map((item, index) => (
                        <TouchableOpacity key={item.id} onPress={() => toggleExpand(item.id)}>
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
                    ))}
                </View>
            </ScrollView>

            <View style={styles.paginationContainer}>
                {Array.from({ length: Math.ceil(readingsData.length / itemsPerPage) }, (_, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => onPageChange(i + 1)}
                        style={[styles.paginationButton, currentPage === i + 1 && styles.selectedPage]}
                    >
                        <Text style={styles.pageNumber}>{i + 1}</Text>
                    </TouchableOpacity>
                ))}
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
        color: 'black',
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
        marginLeft: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    paginationButton: {
        padding: 5,
        marginRight: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    selectedPage: {
        backgroundColor: 'gray',
    },
    pageNumber: {
        color: 'black',
        fontWeight: 'bold',
    },
});
