import * as React from 'react';
import { View, Text } from 'react-native';

export default function ControlScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Controls" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Monitor and Control</Text>
        </View>
    );
}