import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Switch } from 'react-native';
import { db } from '../../config';
import { ref, off, orderByKey, limitToLast, onValue, set, query } from 'firebase/database';
import WebView from 'react-native-webview';

export default function HomeScreen({ navigation }) {
    const basilYield = 299;
    const parsleyYield = 119;

    const [latestDatabaseValue, setLatestDatabaseValue] = useState(null);
    const [ledStatus, setLedStatus] = useState(true);

    useEffect(() => {
        const readingsRef = ref(db, 'readings5');
        const latestReadingQuery = query(readingsRef, orderByKey(), limitToLast(1));

        const listener = onValue(latestReadingQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const latestReadingKey = Object.keys(data)[0];
                const latestReading = data[latestReadingKey];
                setLatestDatabaseValue(latestReading);
            }
        });

        return () => {
            off(latestReadingQuery, 'value', listener);
        };
    }, []);

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
            off(ledControlRef);
        };
    }, []);

    const toggleLedStatus = () => {
        const newStatus = !ledStatus;
        set(ref(db, 'led_control'), newStatus);
    };

    return (
        <View style={styles.container}>
            {/* Header view */}
            <View style={styles.header}>
                {/* Logo on the left */}
                <ImageBackground
                    source={require('../../assets/hydroponic-icon-beige.png')}
                    style={styles.logo}
                />

                {/* Text on the right */}
                <Text style={styles.headerText}>
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

            {/* LED Control */}
            <View style={styles.ledControlContainer}>
                <Text style={styles.ledControlLabel}>LED Control</Text>
                <Switch value={ledStatus} onValueChange={toggleLedStatus} />
            </View>

            {/* Live Feed Card */}
            <Text style={styles.liveFeedHeader}>Live Feed</Text>
            <View style={styles.liveFeedContainer}>
                {/* <View style={styles.liveFeedCard}>
                    <ImageBackground
                        source={require('../../assets/first_trial.jpg')}
                        style={styles.liveFeedImage}
                    />
                </View> */}
                <View style={styles.liveFeedCard}>
                    <WebView
                        source={{ uri: 'https://hydroponic.ngrok.app' }}
                        style={styles.liveFeed}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 34,
        flex: 1,
        backgroundColor: '#3b4d36',
        borderRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    readingsCardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 4,
        marginHorizontal: 24,
    },
    readingsCard: {
        width: '48%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    cardText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'rgba(0, 0, 0, 0.25)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 2, // Shadow radius
    },
    cardValue: {
        color: 'black',
        textShadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    ledControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 116,
    },
    ledControlLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    liveFeedHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 24,
        marginTop: 30,
        marginBottom: 10,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.15)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    liveFeedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 24,
    },
    liveFeedCard: {
        width: '100%',
        height: '600%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        elevation: 2,
    },
    liveFeedImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

