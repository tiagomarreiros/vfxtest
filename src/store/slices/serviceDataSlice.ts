import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ticker } from '../../types/Ticker';

interface ServiceData {
    keywords: string;
    tickerSelected?: Ticker;
}

const initialState: ServiceData = {
    keywords: '',
    tickerSelected: undefined,
};

const serviceDataSlice = createSlice({
    name: 'serviceData',
    initialState,
    reducers: {
        setKeywords: (state, action: PayloadAction<string>) => {
            state.keywords = action.payload;
        },
        setTickerSelected: (state, action: PayloadAction<Ticker>) => {
            state.tickerSelected = action.payload;
        },
    },
});

export const { setKeywords, setTickerSelected } = serviceDataSlice.actions;
export default serviceDataSlice.reducer;
