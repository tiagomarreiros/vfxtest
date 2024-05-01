import React, { useCallback, useMemo, useState } from 'react';
import { SelectDropdown } from '../../components/SelectDropdown';
import { Layout } from '../../components/Layout';
import { Box } from '@gluestack-ui/themed';
import { useGetExchangeForPairQuery } from '../../api/alphaApi';
import { lineDataItem } from 'react-native-gifted-charts';
import { Text } from 'react-native';
import { SpinnerVfx } from '../../components/Spinner';
import { Chart } from '../../components/Chart';

export const LiveRating = () => {

    const [period, setPeriod] = useState<string>('');
    const [pair, setPair] = useState<string>('');

    const { data, isLoading } = useGetExchangeForPairQuery({period, from: pair?.split('-')[0], to: pair?.split('-')[1]}, {skip: !(period.length > 0) || !(pair.length > 0)});

    const handleSelectPeriod = useCallback((value: string) => {
        setPeriod(value);
    }, []);

    const handleSelectPair = useCallback((value: string) => {
        setPair(value);
    }, []);

        const dataFormatted = useMemo(() => {
            if (data && data[`Time Series FX (${period})`]){
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
        }, [data, period]) as lineDataItem[];

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


        return (
            <Layout>
                <Box p={20}>
                    <SelectDropdown options={[
                        { label: 'Daily', value: 'FX_DAILY' },
                        { label: 'Weekly', value: 'FX_WEEKLY' },
                        { label: 'Monthly', value: 'FX_MONTHLY' },
                    ]}
                    placeholder="Select the period"
                    handleSelect={handleSelectPeriod} value={period}                        />
                </Box>
                <Box pt={0} p={20}>
                    <SelectDropdown
                    placeholder="Choose a pair of currencies"
                    options={[
                        {label: 'From EUR to USD', value: 'EUR-USD'},
                        {label: 'From HKD to EUR', value: 'HKD-EUR'},
                        {label: 'From USD to JPY', value: 'USD-JPY'},
                    ]}
                    handleSelect={handleSelectPair}
                    value={pair}
                    />
                </Box>
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
