import { configureStore } from '@reduxjs/toolkit';
import { trainerAPI, pokemonAPI } from './slice/api';
import { sessionComponent, pokemonComponent } from './slice/component';

export const store = configureStore({
    reducer: {
        [trainerAPI.reducerPath]: trainerAPI.reducer,
        [pokemonAPI.reducerPath]: pokemonAPI.reducer,
        [sessionComponent.name]: sessionComponent.reducer,
        [pokemonComponent.name]: pokemonComponent.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(trainerAPI.middleware, pokemonAPI.middleware),
    devTools: import.meta.env.MODE === 'dev',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
