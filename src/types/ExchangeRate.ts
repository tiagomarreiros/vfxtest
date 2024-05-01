import { MonthlySeries } from './Ticker';

export type ExchangeRateResponse = {
    [key: string]: MonthlySeries[]
}
