import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { api } from '../api/alphaApi';
import  serviceDataReducer from '../store/slices/serviceDataSlice';


export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        serviceData: serviceDataReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

