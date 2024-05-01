import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart, LineChartPropsType } from 'react-native-gifted-charts';

export const Chart = (
   props: LineChartPropsType) => {

    const { data } = props;
    console.log('data____', data);
    return (
        <LineChart data={data} {...props} width={Dimensions.get('window').width}
        height={220}/>
    );
};
