import React, { useCallback, useMemo, useState } from 'react';
import { InputText } from '../../components/Input';
import { Box } from '@gluestack-ui/themed';
import { View } from 'react-native';
import { useGetTickersByKeywordsQuery } from '../../api/alphaApi';
import { List } from '../../components/List';
import { Layout } from '../../components/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DATA = {
    'bestMatches': [
        {
            '1. symbol': 'TSCO.LON',
            '2. name': 'Tesco PLC',
            '3. type': 'Equity',
            '4. region': 'United Kingdom',
            '5. marketOpen': '08:00',
            '6. marketClose': '16:30',
            '7. timezone': 'UTC+01',
            '8. currency': 'GBX',
            '9. matchScore': '0.7273',
        },
        {
            '1. symbol': 'TSCDF',
            '2. name': 'Tesco plc',
            '3. type': 'Equity',
            '4. region': 'United States',
            '5. marketOpen': '09:30',
            '6. marketClose': '16:00',
            '7. timezone': 'UTC-04',
            '8. currency': 'USD',
            '9. matchScore': '0.7143',
        },
        {
            '1. symbol': 'TSCDY',
            '2. name': 'Tesco plc',
            '3. type': 'Equity',
            '4. region': 'United States',
            '5. marketOpen': '09:30',
            '6. marketClose': '16:00',
            '7. timezone': 'UTC-04',
            '8. currency': 'USD',
            '9. matchScore': '0.7143',
        },
        {
            '1. symbol': 'TCO2.FRK',
            '2. name': 'TESCO PLC ADR/1 LS-05',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
        {
            '1. symbol': 'TCO0.FRK',
            '2. name': 'TESCO PLC LS-0633333',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
        {
            '1. symbol': 'TSCO.LON',
            '2. name': 'Tesco PLC',
            '3. type': 'Equity',
            '4. region': 'United Kingdom',
            '5. marketOpen': '08:00',
            '6. marketClose': '16:30',
            '7. timezone': 'UTC+01',
            '8. currency': 'GBX',
            '9. matchScore': '0.7273',
        },
        {
            '1. symbol': 'TSCDF',
            '2. name': 'Tesco plc',
            '3. type': 'Equity',
            '4. region': 'United States',
            '5. marketOpen': '09:30',
            '6. marketClose': '16:00',
            '7. timezone': 'UTC-04',
            '8. currency': 'USD',
            '9. matchScore': '0.7143',
        },
        {
            '1. symbol': 'TSCDY',
            '2. name': 'Tesco plc',
            '3. type': 'Equity',
            '4. region': 'United States',
            '5. marketOpen': '09:30',
            '6. marketClose': '16:00',
            '7. timezone': 'UTC-04',
            '8. currency': 'USD',
            '9. matchScore': '0.7143',
        },
        {
            '1. symbol': 'TCO2.FRK',
            '2. name': 'TESCO PLC ADR/1 LS-05',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
        {
            '1. symbol': 'TCO0.FRK',
            '2. name': 'TESCO PLC LS-0633333',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
        {
            '1. symbol': 'TSCDY',
            '2. name': 'Tesco plc',
            '3. type': 'Equity',
            '4. region': 'United States',
            '5. marketOpen': '09:30',
            '6. marketClose': '16:00',
            '7. timezone': 'UTC-04',
            '8. currency': 'USD',
            '9. matchScore': '0.7143',
        },
        {
            '1. symbol': 'TCO2.FRK',
            '2. name': 'TESCO PLC ADR/1 LS-05',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
        {
            '1. symbol': 'TCO0.FRK',
            '2. name': 'TESCO PLC LS-0633333',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
        {
            '1. symbol': 'TCO2.FRK',
            '2. name': 'TESCO PLC ADR/1 LS-05',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
        {
            '1. symbol': 'TCO0.FRK',
            '2. name': 'TESCO PLC LS-0633333',
            '3. type': 'Equity',
            '4. region': 'Frankfurt',
            '5. marketOpen': '08:00',
            '6. marketClose': '20:00',
            '7. timezone': 'UTC+02',
            '8. currency': 'EUR',
            '9. matchScore': '0.5455',
        },
    ],
};

export const SearchTicker = ({ navigation }) => {

    const [text, setText] = useState<string>('');

    const handleText = useCallback((value: string) => {
        setText(value);
    }, [setText]);

    const { data, isLoading, error } = useGetTickersByKeywordsQuery(text);

    const dataFormatted = useMemo(() => {
        if (DATA && DATA.bestMatches) {
            return DATA.bestMatches.map(item => {
                return {
                    ['symbol']: item['1. symbol'],
                    ['name']: item['2. name'],
                    ['type']: item['3. type'],
                    ['region']: item['4. region'],
                    ['marketOpen']: item['5. marketOpen'],
                    ['marketClose']: item['6. marketClose'],
                    ['timezone']: item['7. timezone'],
                    ['currency']: item['8. currency'],
                    ['matchScore']: item['9. matchScore'],
                };
            });
        }
        return [];
    }, [DATA]);


    return (
        <Layout>
            <Box p={20}>
                <InputText text={text} handleText={handleText} />
            </Box>
            <List dataList={dataFormatted} navigation={navigation}/>
        </Layout>
    );
};
