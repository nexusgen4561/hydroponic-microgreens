// Desc: This file contains the main navigation container for the app
import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import HomeScreen from './screens/HomeScreen'
import DataLogScreen from './screens/DataLogScreen'
import ProfileScreen from './screens/ProfileScreen'
import ControlScreen from './screens/ControlScreen'
import ImageProcScreen from './screens/ImageProcScreen'


//Screen Names
const homeName = 'Home';
const dataLogName = 'Data Log';
const profileName = 'Profile';
const controlName = 'Control';
const imageProcName = 'Image Processing';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === dataLogName) {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn === profileName) {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (rn === controlName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (rn === imageProcName) {
                            iconName = focused ? 'image' : 'image-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })
                }
            >
                <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
                <Tab.Screen name={dataLogName} component={DataLogScreen} options={{ headerShown: false }} />
                <Tab.Screen name={imageProcName} component={ImageProcScreen} options={{ headerShown: false }} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer