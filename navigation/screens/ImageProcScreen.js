import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';


export default function ImageProcScreen({ navigation }) {
    const webViewRef = useRef(null); // Reference to the WebView component

    const captureSnap = async () => {
        try {
            if (webViewRef.current) {
                // Capture a screenshot of the WebView
                const uri = await webViewRef.current.capture();

                // Prompt the user to save the snap
                Alert.alert(
                    'Save Snap',
                    'Do you want to save this snap?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Save',
                            onPress: () => {
                                // You can handle the save logic here, e.g., save to device storage
                                // uri contains the file URI
                                // You may want to use a library like react-native-fs to save it.
                                // Example: saveImageToStorage(uri);
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.error('Error capturing snap:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="ios-arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Image Processing</Text>
            </View>

            {/* Live Feed Card */}
            <View style={styles.liveFeedContainer}>
                <ViewShot
                    ref={webViewRef}
                    options={{ format: 'png', quality: 1.0 }} // Set capture options
                    style={styles.liveFeedCard}
                >
                    <WebView
                        source={{ uri: 'https://c7dd02f5de68.ngrok.app' }}
                        style={styles.liveFeed}
                    />
                </ViewShot>
                {/* Snap Camera Button */}
                <TouchableOpacity onPress={captureSnap} style={styles.snapButton}>
                    <Ionicons name="camera" size={32} color="white" />
                </TouchableOpacity>
            </View>
            {/* Sample Reading Cards */}
            <View style={styles.readingsCardContainer}>
                {/* Card 1 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Thresholding</Text>
                    <Text style={styles.cardValue}>

                    </Text>
                </View>

                {/* Card 2 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Edge Detection</Text>
                    <Text style={styles.cardValue}>

                    </Text>
                </View>

                {/* Card 3 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Segmentation</Text>
                    <Text style={styles.cardValue}>

                    </Text>
                </View>

                {/* Card 4 */}
                <View style={styles.readingsCard}>
                    <Text style={styles.cardText}>Yield Count</Text>
                    <Text style={styles.cardValue}>

                    </Text>
                </View>
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
    liveFeedHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 10,
    },
    liveFeedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 25,
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
    liveFeed: {
        flex: 1,
    },
    snapButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 35,
        position: 'absolute',
        left: 150,
        elevation: 5,
        top: 200
    },
    readingsCardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 250,
        marginHorizontal: 24,
    },
    readingsCard: {
        width: '48%', // To create two columns
        height: '92%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2, // For shadow
    },
    cardText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
