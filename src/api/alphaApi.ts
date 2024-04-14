import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'alphaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co' }),
  endpoints: (builder) => ({
    getTickersByKeywords: builder.query<string, string>({
      query: (keywords) => `query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.API_KEY}`,
    }),
    getDataMonthly: builder.query<string, string>({
      query: (symbol) => `query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.API_KEY}`,
    }),
  }),
});

export const { useGetTickersByKeywordsQuery, useGetDataMonthlyQuery } = api;

