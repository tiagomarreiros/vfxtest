import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export const LiveRating = () => {
    const data = [ {value:50}, {value:80}, {value:90}, {value:70} ];

        return (

            <View >
                <LineChart data = {data} lineGradient/>
            </View>
        );
};
