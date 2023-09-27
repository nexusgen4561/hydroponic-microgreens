import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
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
                    onPress={() => alert('This is the "Home" screen.')}
                    style={styles.headerText}>
                    Hydroponic IoT
                </Text>
            </View>

            {/* Sample Reading Cards */}
            <View style={styles.readingsCardContainer}>
                {/* Card 1 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Status</Text>
                </View>

                {/* Card 2 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Temperature</Text>
                </View>

                {/* Card 3 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>pH Value</Text>
                </View>

                {/* Card 4 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>TDS Value</Text>
                </View>
            </View>

            {/* Live Feed Card */}
            <Text style={styles.liveFeedHeader}>Live Feed</Text>
            <View style={styles.liveFeedContainer}>
                <View style={styles.liveFeedCard}>
                    <Text style={styles.cardText}>Sample Text</Text>
                </View>
            </View>


            {/* Yield Cards */}
            <Text style={styles.yieldHeader}>Yield Count</Text>
            <View style={styles.yieldCardContainer}>
                <View style={styles.yieldCard}>
                    <Text style={styles.cardText}>Basil</Text>
                </View>

                {/* Card 2 */}
                <View style={styles.yieldCard}>
                    <Text style={styles.cardText}>Parsley</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 24,
    },
    logo: {
        width: 60,
        height: 60,
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
        marginTop: 40,
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
        height: '64%',
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
        height: '320%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2, // For shadow
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    yieldHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 24,
        marginTop: 150, // Adjust spacing from the top
        marginBottom: 10
    },
    liveFeedHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 24,
        marginTop: 70, // Adjust spacing from the top
        marginBottom: 10
    },
});
