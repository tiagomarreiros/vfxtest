import React, { useCallback, useMemo, useState } from 'react';
import { InputText } from '../../components/Input';
import { Box, Center } from '@gluestack-ui/themed';
import { StyleSheet, Text } from 'react-native';
import { useGetTickersByKeywordsQuery } from '../../api/alphaApi';
import { List } from '../../components/List';
import { Layout } from '../../components/Layout';
import { SpinnerVfx } from '../../components/Spinner';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ToastVfx } from '../../components/Toast';
import { SerializedError } from '@reduxjs/toolkit';

export const SearchTicker = ({ navigation }: {navigation: NavigationProp<ParamListBase>}) => {

    const [text, setText] = useState<string>('');

    const handleText = useCallback((value: string) => {
        setText(value);
    }, [setText]);

    const { data, isLoading, error } = useGetTickersByKeywordsQuery(text, {skip: !(text.length > 1)});

    console.log(data);
    const dataFormatted = useMemo(() => {
        if (data && data.bestMatches) {
            return data.bestMatches.map(item => {
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
    }, [data]);

    return (
        <Layout>
            <Box padding={20}>
                <InputText text={text} handleText={handleText} />
            </Box>
            {
                isLoading ? <SpinnerVfx size="large"/> : dataFormatted?.length ?
                <List dataList={dataFormatted} navigation={navigation} /> :
                <Center>
                    <Text style={styles.text}>No data</Text>
                </Center>
            }
            {error && <ToastVfx title="Error" message={error.message}/>}
        </Layout>
    );
};

const styles = StyleSheet.create({
    text: {
      color: 'black',
    },
  });
