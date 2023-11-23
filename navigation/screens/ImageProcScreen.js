import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { db } from '../../config';
import { ref, off, onValue, set } from 'firebase/database';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage

export default function ImageProcScreen({ navigation }) {

    const [imageProcess, setImageProcess] = useState(true);
    const [storageItems, setStorageItems] = useState([]);
    const customOrder = ['Original Image.jpg', 'Plant Health Status.jpg', 'Grayscale.jpg', 'Edge Detection.jpg', 'Contour Detection.jpg', 'Thresholded Image.jpg', 'Processed Image.jpg']; // Define your custom order

    useEffect(() => {
        // Create a reference to the "image_process" node in Firebase
        const imageProcessRef = ref(db, 'image_process');

        // Listen for changes in the "image_process" value in Firebase
        onValue(imageProcessRef, (snapshot) => {
            const newValue = snapshot.val();
            setImageProcess(newValue);
        });

        // Fetch all items from your storage bucket
        const storage = getStorage();
        const storageBucket = storageRef(storage); // Change to your bucket path

        listAll(storageBucket)
            .then((result) => {
                const itemPromises = customOrder.map(async (filename) => {
                    const item = result.items.find((i) => i.name === filename);
                    if (item) {
                        const itemUrl = await getDownloadURL(item);
                        const label = filename.split('.jpg')[0]; // Extract label from the filename
                        return { url: itemUrl, label };
                    }
                    return null;
                });

                Promise.all(itemPromises).then((itemsWithLabels) => {
                    // Filter out any null values (items not found in the custom order)
                    const filteredItems = itemsWithLabels.filter((item) => item !== null);
                    setStorageItems(filteredItems);
                });
            })
            .catch((error) => {
                console.error('Error listing items from Firebase Storage:', error);
            });

        // Clean up the listener when the component unmounts
        return () => {
            off(imageProcessRef);
        };
    }, []);


    const captureSnap = () => {
        // Toggle the image processing status and update the database
        const newStatus = !imageProcess;
        set(ref(db, 'image_process'), newStatus);

        // Display an alert
        if (imageProcess === true || imageProcess === false) {
            alert('Image Processing Completed!');
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="ios-arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.header}>Image Processing</Text>
            </View>

            {/* Live Feed Card */}
            <Text style={styles.liveFeedHeader}>Live Feed</Text>
            <View style={styles.liveFeedContainer}>
                <View style={styles.liveFeedCard}>
                    <WebView
                        source={{ uri: 'https://hydroponic.ngrok.app' }}
                        style={styles.liveFeed}
                    />
                </View>
            </View>
            <View style={styles.processImageButton}>
                <Button
                    title="Process Image"
                    onPress={captureSnap}

                />
            </View>
            {/* Photo Gallery */}
            <View>
                <Text style={styles.galleryHeader}>Latest Image Processing Results</Text>
            </View>
            <ScrollView>
                {storageItems.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Image
                            style={styles.storageImage}
                            source={{ uri: item.url }}
                        />
                        <Text style={styles.itemLabel}>{item.label}</Text>
                    </View>
                ))}
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 32,
        backgroundColor: '#3b4d36',
        borderRadius: 4,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginLeft: 20,
    },
    backButton: {
        marginRight: 16,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 75,
        flex: 1,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    liveFeedHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 10,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    liveFeedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 190,
    },
    liveFeedCard: {
        width: '100%',
        height: '600%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginBottom: 20,
        elevation: 2,
    },
    liveFeed: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    processImageButton: {// Set your desired background color
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        left: 100,
        width: 150, // Set your desired width
        height: 50, // Set your desired height
        borderRadius: 8, // Set your desired border radius
    },
    galleryHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 14,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    galleryContainer: {
        flexDirection: 'column',
        marginHorizontal: 15,
    },
    folderContainer: {
        marginVertical: 24,
    },
    folderName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    estimatedPlantCount: {
        fontSize: 16,
        color: '#fff',
    },
    galleryImage: {
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 5,
        elevation: 2,
    },
    storageImage: {
        justifyContent: 'center',
        width: 320,
        height: 240,
        marginLeft: 24,
        marginTop: 18
    },
    itemLabel: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});


