
import React, { useCallback, useState } from 'react';
import { SelectDropdown } from '../../components/SelectDropdown';
import { Layout } from '../../components/Layout';
import { Box, Text, Center } from '@gluestack-ui/themed';
import { useGetExchangeForPairQuery } from '../../api/alphaApi';
import { SpinnerVfx } from '../../components/Spinner';
import { ChartVFX } from '../../components/Chart';
import { useFormatData } from '../../hooks/useFormatData';
import { StyleSheet } from 'react-native';
import { ButtonVfx } from '../../components/Button/Index';
import { CardApp } from '../../components/Card';
import { ToastVfx } from '../../components/Toast';

export const LiveRating = () => {

    const [period, setPeriod] = useState<string>('');
    const [pair, setPair] = useState<string>('');

    const { data, isLoading, error, refetch, isFetching } = useGetExchangeForPairQuery({period, from: pair?.split('-')[0], to: pair?.split('-')[1]}, {skip: !(period.length > 0 && pair.length > 0)});

    const handleSelectPeriod = useCallback((value: string) => {
        setPeriod(value);
    }, []);

    const handleSelectPair = useCallback((value: string) => {
        setPair(value);
    }, []);

    const periodOptions = [
        { label: 'Daily', value: 'FX_DAILY' },
        { label: 'Weekly', value: 'FX_WEEKLY' },
        { label: 'Monthly', value: 'FX_MONTHLY' },
    ];

    const pairsOptions = [
        {label: 'From EUR to USD', value: 'EUR-USD'},
        {label: 'From HKD to EUR', value: 'HKD-EUR'},
        {label: 'From USD to JPY', value: 'USD-JPY'},
    ];

    const {
        dataFormatted,
        minValueY,
        maxValueY,
        minValueX,
        maxValueX,
    } = useFormatData({data, keyIndex: `Time Series FX (${periodOptions.find(p => p.value === period)?.label})`, period: period});

        return (
            <Layout>
                <Box p={20}>
                    <SelectDropdown options={periodOptions}
                        placeholder="Select the period"
                        handleSelect={handleSelectPeriod} value={period}/>
                </Box>
                <Box pt={0} p={20}>
                    <SelectDropdown
                        placeholder="Choose a pair of currencies"
                        options={pairsOptions}
                        handleSelect={handleSelectPair}
                        value={pair}
                    />
                </Box>
                <Box p={5}>
                    {
                        isLoading || isFetching ? <SpinnerVfx size={'small'} /> : dataFormatted.length && minValueX && maxValueX && minValueY && maxValueY ?
                        <Box>
                            <CardApp>
                                <ChartVFX data={dataFormatted} minValueX={minValueX} maxValueX={maxValueX} minValueY={minValueY} maxValueY={maxValueY} period={period}/>
                            </CardApp>
                       <Box>
                       <ButtonVfx text="Refresh Chart" onPress={() => refetch()}/>

                       </Box>
                       </Box> : <Center><Text style={styles.text}>No data</Text></Center>
                    }



                </Box>
                {error && <ToastVfx title="Error" message={error.message}/>}
            </Layout>
        );
};

const styles = StyleSheet.create({
    text: {
      color: 'black',
    },
    chartTextStyle: {
        color: 'black',
    },
  });
