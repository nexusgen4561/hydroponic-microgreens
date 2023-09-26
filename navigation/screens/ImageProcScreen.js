import * as React from 'react';
import { View, Text } from 'react-native';

export default function ImageProcScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Image Processing" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Image Processing</Text>
        </View>
    );
}