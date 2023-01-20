import { configureStore } from '@reduxjs/toolkit';
import { trainerAPI } from './slice/api';

export const store = configureStore({
    reducer: {
        [trainerAPI.reducerPath]: trainerAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(trainerAPI.middleware),
    devTools: import.meta.env.MODE === 'dev',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
