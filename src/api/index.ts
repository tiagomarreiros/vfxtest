export const SEARCH_TICKER = (keywords: string) =>
  `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.API_KEY}`;

export const MONTHLY = (symbol: string) =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.API_KEY}`;
