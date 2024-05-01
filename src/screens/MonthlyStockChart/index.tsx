import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { lineDataItem } from 'react-native-gifted-charts';
import { Chart } from '../../components/Chart';
import { Box } from '@gluestack-ui/themed';
import { useGetDataMonthlyQuery } from '../../api/alphaApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SpinnerVfx } from '../../components/Spinner';
import { Layout } from '../../components/Layout';
import { CardApp } from '../../components/Card';

export const MonthlyStockChart = () => {

    const ticker = useSelector((state: RootState) => state.serviceData.tickerSelected);

    const { data, isLoading } = useGetDataMonthlyQuery(ticker?.symbol, {skip: !ticker});

    console.log('data monthly', data);
    const dataFormatted = useMemo(() => {
        if (data && data['Monthly Time Series']){
            const list = data['Monthly Time Series'];

            return Object.keys(list).map((i) => {
                const date =  new Date(i);
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                return {
                    value: parseFloat(list[i]['4. close']),
                    label: `${month} ${year}`,
                    dataPointText: list[i]['4. close'],
                };
                });
        }
       return [];
    }, [data]) as lineDataItem[];

        const { minValue, maxValue } = useMemo(() => {
            if (dataFormatted && dataFormatted.length > 0){
                const values = dataFormatted.map(i => i.value);
                return {
                    minValue: Math.min(...values),
                    maxValue: Math.max(...values),
                };
            }
            return {};
        }, [dataFormatted]) as {minValue?: number, maxValue?: number};

        if (!(dataFormatted && dataFormatted.length)){
            return <View><Text>loading</Text></View>;
        }

        return (
            <Layout>
                <CardApp>
                    <Text style={{color: 'black'}}>Name: {ticker?.name}</Text>
                    <Text style={{color: 'black'}}>Symbol: {ticker?.symbol}</Text>
                    <Text style={{color: 'black'}}>Currency: {ticker?.currency}</Text>
                    <Text style={{color: 'black'}}>Region: {ticker?.region}</Text>
                    <Text style={{color: 'black'}}>Timezone: {ticker?.timezone}</Text>
                    <Text style={{color: 'black'}}>Market Open: {ticker?.marketOpen}</Text>
                    <Text style={{color: 'black'}}>Market Close: {ticker?.marketClose}</Text>
                </CardApp>
                <Box p={5}>
                    {
                        isLoading ? <SpinnerVfx size="large"/> : dataFormatted?.length > 0 && minValue && maxValue ?
                        <Chart
                        isAnimated
                        thickness={3}
                        color="#07BAD1"
                        animateOnDataChange
                        animationDuration={1000}
                        onDataChangeAnimationDuration={300}
                        areaChart
                        width={200}
                        adjustToWidth={true}
                        yAxisTextStyle={{color: 'black'}}
                        xAxisLabelTextStyle={{color: 'black'}}
                        data={dataFormatted}
                        startFillColor={'rgb(84,219,234)'}
                        endFillColor={'rgb(84,219,234)'}
                        startOpacity={0.4}
                        endOpacity={0.1}
                        //backgroundColor="#414141"
                        //rulesColor="gray"
                        rulesType="solid"
                        //yAxisColor="lightgray"
                        //xAxisColor="black"
                        yAxisOffset={minValue}
                        maxValue={maxValue}
                        curved
                        spacing={100}
                        initialSpacing={30}

                        /> : <Text>No data</Text>
                        }

                </Box>
            </Layout>

        );
};
