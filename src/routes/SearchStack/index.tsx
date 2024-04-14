import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();
function DetailsScreen() {
    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
        </View>
    );
}
const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="search" component={DetailsScreen} />
        </Stack.Navigator>
    );
};

export default SearchStack;
