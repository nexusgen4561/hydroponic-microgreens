import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { db } from '../../config';
import { ref, off, orderByKey, limitToLast, onValue, query } from 'firebase/database';
import WebView from 'react-native-webview';

export default function HomeScreen({ navigation }) {
    const basilYield = 944;
    const parsleyYield = 1043;

    const [latestDatabaseValue, setLatestDatabaseValue] = useState(null);

    useEffect(() => {
        const readingsRef = ref(db, 'readings');
        const latestReadingQuery = query(readingsRef, orderByKey(), limitToLast(1));

        const listener = onValue(latestReadingQuery, (snapshot) => {
            const data = snapshot.val();
            const latestReadingKey = Object.keys(data)[0];
            const latestReading = data[latestReadingKey];

            setLatestDatabaseValue(latestReading);
        });

        return () => {
            off(latestReadingQuery, 'value', listener);
        };
    }, []);


    return (
        <View>
            {/* Header view */}
            <View style={styles.header}>
                {/* Logo on the left */}
                <Image
                    source={require('../../assets/hydroponic-icon.png')} // Replace with the actual path to your logo
                    style={styles.logo}
                />

                {/* Text on the right */}
                <Text
                    style={styles.headerText}>
                    Hydroponic IoT
                </Text>
            </View>

            {/* Sample Reading Cards */}
            <View style={styles.readingsCardContainer}>
                {/* Card 1 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Status</Text>
                    <Text style={styles.cardValue}>
                        {latestDatabaseValue && latestDatabaseValue.Status}
                    </Text>
                </View>

                {/* Card 2 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Temperature</Text>
                    <Text style={styles.cardValue}>
                        {latestDatabaseValue && latestDatabaseValue.Temperature}
                    </Text>
                </View>

                {/* Card 3 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>pH Value</Text>
                    <Text style={styles.cardValue}>
                        {latestDatabaseValue && latestDatabaseValue.pH_Value}
                    </Text>
                </View>

                {/* Card 4 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>TDS Value</Text>
                    <Text style={styles.cardValue}>
                        {latestDatabaseValue && latestDatabaseValue.tds_Value}
                    </Text>
                </View>
            </View>

            {/* Live Feed Card */}
            <Text style={styles.liveFeedHeader}>Live Feed</Text>
            <View style={styles.liveFeedContainer}>
                <View style={styles.liveFeedCard}>
                    <WebView
                        source={{ uri: 'https://c7dd02f5de68.ngrok.app' }} // Replace with your live feed URL
                        style={styles.liveFeed}
                    />
                </View>
            </View>

            {/* Yield Cards */}
            <Text style={styles.yieldHeader}>Yield Count</Text>
            <View style={styles.yieldCardContainer}>
                <View style={styles.yieldCard}>
                    <Text style={styles.cardText}>Basil</Text>
                    <Text style={styles.yieldCount}>{basilYield} yields</Text>
                </View>

                {/* Card 2 */}
                <View style={styles.yieldCard}>
                    <Text style={styles.cardText}>Parsley</Text>
                    <Text style={styles.yieldCount}>{parsleyYield} yields</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 34,
        marginLeft: 24,
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 60,
    },
    readingsCardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 4,
        marginHorizontal: 24,
    },
    yieldCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, // Adjust spacing from the bottom
        marginHorizontal: 24,
    },
    liveFeedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, // Adjust spacing from the bottom
        marginHorizontal: 24,
    },
    readingsCard: {
        width: '48%', // To create two columns
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2, // For shadow
    },
    yieldCard: {
        width: '48%', // To create two columns
        height: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2, // For shadow
    },
    liveFeedCard: {
        width: '100%', // To create two columns
        height: '600%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        elevation: 2, // For shadow
    },
    cardText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    yieldHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 24,
        marginTop: 160, // Adjust spacing from the top
        marginBottom: 10,
    },
    liveFeedHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 24,
        marginTop: 100, // Adjust spacing from the top
        marginBottom: 10,
    },
    liveFeedVideo: {
        width: '100%',
        height: 300, // Set the desired height for your video
    },
});
