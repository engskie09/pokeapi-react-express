import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './slice/api';

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware),
    devTools: import.meta.env.MODE === 'dev',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
