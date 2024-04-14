import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ServiceData {
    keywords: string;
    tickerSelected: string;
}

const initialState: ServiceData = {
    keywords: '',
    tickerSelected: '',
};

const serviceDataSlice = createSlice({
    name: 'serviceData',
    initialState,
    reducers: {
        setKeywords: (state, action: PayloadAction<string>) => {
            state.keywords = action.payload;
        },
        setTickerSelected: (state, action: PayloadAction<string>) => {
            state.tickerSelected = action.payload;
        },
    },
});

export const { setKeywords, setTickerSelected } = serviceDataSlice.actions;
export default serviceDataSlice.reducer;
