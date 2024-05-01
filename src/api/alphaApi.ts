import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataMonthlyResponse, SearchTicketResponse } from '../types/Ticker';
import { ExchangeRateResponse } from '../types/ExchangeRate';

export const api = createApi({
  reducerPath: 'alphaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co' }),
  endpoints: (builder) => ({
    getTickersByKeywords: builder.query<SearchTicketResponse, string | undefined>({
      query: (keywords) => `query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=VEM6NEPWIELOQUEW`,
    }),
    getDataMonthly: builder.query<DataMonthlyResponse, string | undefined>({
      query: (symbol) => `query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=VEM6NEPWIELOQUEW`,
    }),
    getExchangeForPair : builder.query<ExchangeRateResponse, {period?: string, from?: string, to?: string}>({
      query: ({period, from, to}) => `query?function=${period}&from_symbol=${from}&to_symbol=${to}&apikey=VEM6NEPWIELOQUEW`,
    }),
  }),
});

export const { useGetTickersByKeywordsQuery, useGetDataMonthlyQuery, useGetExchangeForPairQuery } = api;

