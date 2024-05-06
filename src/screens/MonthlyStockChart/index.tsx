import React from 'react';
import {  Text, StyleSheet } from 'react-native';
import { Chart, ChartVFX } from '../../components/Chart';
import { Box } from '@gluestack-ui/themed';
import { useGetDataMonthlyQuery } from '../../api/alphaApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SpinnerVfx } from '../../components/Spinner';
import { Layout } from '../../components/Layout';
import { CardApp } from '../../components/Card';
import { useFormatData } from '../../hooks/useFormatData';
import { ToastVfx } from '../../components/Toast';

export const MonthlyStockChart = () => {

    const ticker = useSelector((state: RootState) => state.serviceData.tickerSelected);

    const { data, isLoading, error } = useGetDataMonthlyQuery(ticker?.symbol, {skip: !ticker});

    const {
        dataFormatted,
        minValueY,
        maxValueY,
        minValueX,
        maxValueX,
    } = useFormatData({data, keyIndex: 'Monthly Time Series'});
    console.log('MONTHLY DATA',  dataFormatted,
    minValueY,
    maxValueY,
    minValueX,
    maxValueX);
    return (
        <Layout>
            <CardApp>
                <Text style={styles.text}>Name: {ticker?.name}</Text>
                <Text style={styles.text}>Symbol: {ticker?.symbol}</Text>
                <Text style={styles.text}>Currency: {ticker?.currency}</Text>
                <Text style={styles.text}>Region: {ticker?.region}</Text>
                <Text style={styles.text}>Timezone: {ticker?.timezone}</Text>
                <Text style={styles.text}>Market Open: {ticker?.marketOpen}</Text>
                <Text style={styles.text}>Market Close: {ticker?.marketClose}</Text>
            </CardApp>
            <Box p={5}>
                {
                    isLoading ? <SpinnerVfx size="large"/> : dataFormatted?.length > 0
                    && minValueX && maxValueX && minValueY && maxValueY ?
                    <CardApp>
                        <ChartVFX data={dataFormatted} minValueX={minValueX} maxValueX={maxValueX} minValueY={minValueY} maxValueY={maxValueY} />
                    </CardApp> : <Text style={styles.text}>No data</Text>
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
