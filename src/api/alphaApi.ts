import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataMonthlyResponse, SearchTicketResponse } from '../types/Ticker';
import { ExchangeRateResponse } from '../types/ExchangeRate';
import { Alert } from 'react-native';


const onQueryStartedErrorToast = async ({ queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (error) {
    Alert.alert('Error', 'Error getting data', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
};

export const api = createApi({
  reducerPath: 'alphaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co' }),
  endpoints: (builder) => ({
    getTickersByKeywords: builder.query<SearchTicketResponse, string | undefined>({
      query: (keywords) => `query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.API_KEY}`,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getDataMonthly: builder.query<DataMonthlyResponse, string | undefined>({
      query: (symbol) => `query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.API_KEY}`,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getExchangeForPair : builder.query<ExchangeRateResponse, {period?: string, from?: string, to?: string}>({
      query: ({period, from, to}) => `query?function=${period}&from_symbol=${from}&to_symbol=${to}&apikey=${process.env.API_KEY}`,
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),

});

export const { useGetTickersByKeywordsQuery, useGetDataMonthlyQuery, useGetExchangeForPairQuery } = api;

