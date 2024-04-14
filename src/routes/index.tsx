import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
function DetailsScreen() {
    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'red' }}>
            <Text>Details Screen ffffffffffffffffffffffffffffffffff</Text>
        </View>
    );
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen name="Search" component={DetailsScreen} />
                <Stack.Screen name="LiveRating" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
