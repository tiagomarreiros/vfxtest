
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

//const DATA = [{'x': 10, 'y': 152.949}, {'x': 11, 'y': 157.7}, {'x': 12, 'y': 151.303}, {'x': 13, 'y': 149.971}, {'x': 14, 'y': 146.889}, {'x': 15, 'y': 140.998}, {'x': 16, 'y': 148.176}, {'x': 17, 'y': 151.627}, {'x': 18, 'y': 149.33}, {'x': 19, 'y': 145.506}, {'x': 20, 'y': 142.25}, {'x': 21, 'y': 144.261}, {'x': 22, 'y': 139.299}, {'x': 23, 'y': 136.24}, {'x': 24, 'y': 132.797}, {'x': 25, 'y': 136.172}, {'x': 26, 'y': 130.09}, {'x': 27, 'y': 131.072}, {'x': 28, 'y': 138.05}, {'x': 29, 'y': 148.714}, {'x': 30, 'y': 144.729}, {'x': 31, 'y': 139.065}, {'x': 32, 'y': 133.19}, {'x': 33, 'y': 135.733}, {'x': 34, 'y': 128.687}, {'x': 35, 'y': 129.83}, {'x': 36, 'y': 121.68}, {'x': 37, 'y': 114.997}, {'x': 38, 'y': 115.04}, {'x': 39, 'y': 115.068}, {'x': 40, 'y': 113.148}, {'x': 41, 'y': 114}, {'x': 42, 'y': 111.283}, {'x': 43, 'y': 109.989}, {'x': 44, 'y': 109.615}, {'x': 45, 'y': 111.073}, {'x': 46, 'y': 109.562}, {'x': 47, 'y': 109.318}, {'x': 48, 'y': 110.714}, {'x': 49, 'y': 106.504}, {'x': 50, 'y': 104.657}, {'x': 51, 'y': 103.259}, {'x': 52, 'y': 104.299}, {'x': 53, 'y': 104.662}, {'x': 54, 'y': 105.426}, {'x': 55, 'y': 105.88}, {'x': 56, 'y': 105.922}, {'x': 57, 'y': 107.948}, {'x': 58, 'y': 107.783}, {'x': 59, 'y': 107.116}, {'x': 60, 'y': 107.759}, {'x': 61, 'y': 108.056}, {'x': 62, 'y': 108.36}, {'x': 63, 'y': 108.69}, {'x': 64, 'y': 109.48}, {'x': 65, 'y': 108.031}, {'x': 66, 'y': 108.069}, {'x': 67, 'y': 106.28}, {'x': 68, 'y': 108.732}, {'x': 69, 'y': 107.82}, {'x': 70, 'y': 108.27}, {'x': 71, 'y': 111.449}, {'x': 72, 'y': 110.82}, {'x': 73, 'y': 111.383}, {'x': 74, 'y': 108.836}, {'x': 75, 'y': 109.63}, {'x': 76, 'y': 113.545}, {'x': 77, 'y': 112.932}, {'x': 78, 'y': 113.66}, {'x': 79, 'y': 111.02}, {'x': 80, 'y': 111.767}, {'x': 81, 'y': 110.67}, {'x': 82, 'y': 108.773}, {'x': 83, 'y': 109.267}, {'x': 84, 'y': 106.248}, {'x': 85, 'y': 106.654}, {'x': 86, 'y': 109.193}, {'x': 87, 'y': 112.614}, {'x': 88, 'y': 112.667}, {'x': 89, 'y': 113.641}, {'x': 90, 'y': 112.428}, {'x': 91, 'y': 110.054}, {'x': 92, 'y': 110.306}, {'x': 93, 'y': 112.36}, {'x': 94, 'y': 110.833}, {'x': 95, 'y': 111.495}, {'x': 96, 'y': 111.383}, {'x': 97, 'y': 112.84}, {'x': 98, 'y': 112.666}, {'x': 99, 'y': 116.95}, {'x': 100, 'y': 114.37}, {'x': 101, 'y': 104.849}, {'x': 102, 'y': 101.32}, {'x': 103, 'y': 103.324}, {'x': 104, 'y': 102.047}, {'x': 105, 'y': 103.183}, {'x': 106, 'y': 110.736}, {'x': 107, 'y': 106.282}, {'x': 108, 'y': 112.532}, {'x': 109, 'y': 112.326}, {'x': 110, 'y': 121.14}, {'x': 111, 'y': 120.209}, {'x': 112, 'y': 123.146}, {'x': 113, 'y': 120.608}, {'x': 114, 'y': 119.932}, {'x': 115, 'y': 121.205}, {'x': 116, 'y': 123.85}, {'x': 117, 'y': 122.421}, {'x': 118, 'y': 124.1}, {'x': 119, 'y': 119.472}, {'x': 120, 'y': 119.993}, {'x': 121, 'y': 119.56}, {'x': 122, 'y': 117.45}, {'x': 123, 'y': 119.66}, {'x': 124, 'y': 118.63}, {'x': 125, 'y': 112.3}, {'x': 126, 'y': 109.6}, {'x': 127, 'y': 104.07}, {'x': 128, 'y': 102.8}, {'x': 129, 'y': 101.3}, {'x': 130, 'y': 101.77}, {'x': 131, 'y': 102.22}, {'x': 132, 'y': 103.21}, {'x': 133, 'y': 101.77}, {'x': 134, 'y': 102.05}, {'x': 135, 'y': 105.29}, {'x': 136, 'y': 102.39}, {'x': 137, 'y': 98.36}, {'x': 138, 'y': 98.23}, {'x': 139, 'y': 98.17}, {'x': 140, 'y': 97.79}, {'x': 141, 'y': 99.12}, {'x': 142, 'y': 100.47}, {'x': 143, 'y': 97.37}, {'x': 144, 'y': 94.2}, {'x': 145, 'y': 92.56}, {'x': 146, 'y': 91.72}, {'x': 147, 'y': 86.72}, {'x': 148, 'y': 82.45}, {'x': 149, 'y': 79.79}, {'x': 150, 'y': 77.96}, {'x': 151, 'y': 78.37}, {'x': 152, 'y': 78.11}, {'x': 153, 'y': 79.78}, {'x': 154, 'y': 78.36}, {'x': 155, 'y': 79.82}, {'x': 156, 'y': 82.84}, {'x': 157, 'y': 81.14}, {'x': 158, 'y': 76.26}, {'x': 159, 'y': 76.86}, {'x': 160, 'y': 77.61}, {'x': 161, 'y': 78.18}, {'x': 162, 'y': 77.01}, {'x': 163, 'y': 76.66}, {'x': 164, 'y': 76.77}, {'x': 165, 'y': 80.56}, {'x': 166, 'y': 81.48}, {'x': 167, 'y': 81.21}, {'x': 168, 'y': 83.19}, {'x': 169, 'y': 81.78}, {'x': 170, 'y': 82.03}, {'x': 171, 'y': 81.12}, {'x': 172, 'y': 83.64}, {'x': 173, 'y': 80.31}, {'x': 174, 'y': 83.5}, {'x': 175, 'y': 84.17}, {'x': 176, 'y': 86.46}, {'x': 177, 'y': 88.39}, {'x': 178, 'y': 91.17}, {'x': 179, 'y': 93.81}, {'x': 180, 'y': 93.44}, {'x': 181, 'y': 88.91}, {'x': 182, 'y': 90.27}, {'x': 183, 'y': 93.02}, {'x': 184, 'y': 86.31}, {'x': 185, 'y': 90.04}, {'x': 186, 'y': 89.72}, {'x': 187, 'y': 92.97}, {'x': 188, 'y': 94.64}, {'x': 189, 'y': 96.33}, {'x': 190, 'y': 95.32}, {'x': 191, 'y': 98.56}, {'x': 192, 'y': 98.87}, {'x': 193, 'y': 97.56}, {'x': 194, 'y': 89.94}, {'x': 195, 'y': 90.65}, {'x': 196, 'y': 95.48}, {'x': 197, 'y': 98.41}, {'x': 198, 'y': 105.98}, {'x': 199, 'y': 108.77}, {'x': 200, 'y': 107.83}, {'x': 201, 'y': 106.07}, {'x': 202, 'y': 105.5}, {'x': 203, 'y': 103.97}, {'x': 204, 'y': 99.91}, {'x': 205, 'y': 103.94}, {'x': 206, 'y': 106.41}, {'x': 207, 'y': 111.66}, {'x': 208, 'y': 111.2}, {'x': 209, 'y': 115.23}, {'x': 210, 'y': 114.79}, {'x': 211, 'y': 115.76}, {'x': 212, 'y': 118.59}, {'x': 213, 'y': 123.16}, {'x': 214, 'y': 121.72}, {'x': 215, 'y': 119.49}, {'x': 216, 'y': 117.81}, {'x': 217, 'y': 118.52}, {'x': 218, 'y': 120.63}, {'x': 219, 'y': 119.05}, {'x': 220, 'y': 115.8}, {'x': 221, 'y': 116.96}, {'x': 222, 'y': 118.17}, {'x': 223, 'y': 117.38}, {'x': 224, 'y': 114.62}, {'x': 225, 'y': 114.42}, {'x': 226, 'y': 112.6}, {'x': 227, 'y': 113.84}, {'x': 228, 'y': 117.69}, {'x': 229, 'y': 115.74}, {'x': 230, 'y': 117.19}, {'x': 231, 'y': 118.02}, {'x': 232, 'y': 119.8}, {'x': 233, 'y': 116.39}, {'x': 234, 'y': 113.5}, {'x': 235, 'y': 110.6}, {'x': 236, 'y': 112.71}, {'x': 237, 'y': 110.73}, {'x': 238, 'y': 108.45}, {'x': 239, 'y': 104.69}];

export const LiveRating = () => {

    const [period, setPeriod] = useState<string>('');
    const [pair, setPair] = useState<string>('');

    const { data, isLoading, error, refetch } = useGetExchangeForPairQuery({period, from: pair?.split('-')[0], to: pair?.split('-')[1]}, {skip: !(period.length > 0 && pair.length > 0)});
    console.log('isLoading', isLoading);
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
                        isLoading ? <SpinnerVfx size={'small'} /> : dataFormatted.length && minValueX && maxValueX && minValueY && maxValueY ?
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
