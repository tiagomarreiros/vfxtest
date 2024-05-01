import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SearchTicker } from '../screens/SearchTicker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LiveRating } from '../screens/LiveRating';
import { MonthlyStockChart } from '../screens/MonthlyStockChart';


const Tab = createBottomTabNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                headerShown: true, tabBarLabelStyle: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlignVertical: 'center',
                },
            }}>
                <Tab.Screen name="Search" component={SearchTicker} />
                <Tab.Screen name="Live Rating" component={LiveRating} />
                <Tab.Screen name="Monthly Stock Chart" component={MonthlyStockChart}
                options={{ tabBarStyle: {display: 'none'}, tabBarItemStyle:{display: 'none'}}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
