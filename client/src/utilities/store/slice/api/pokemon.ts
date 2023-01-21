import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { snakeKeys } from 'js-convert-case';

import type { RootState } from '../../store';

export const pokemonAPI = createApi({
    reducerPath: 'pokemonAPI',
    tagTypes: ['pokemons'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).sessionComponent;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints(builder) {
        return {
            pokemons: builder.query<any, void>({
                query: () => ({
                    method: 'GET',
                    url: `pokemons`,
                }),
                transformResponse: (response: any): any => snakeKeys(response, { recursive: true }) as any,
                providesTags: ['pokemons'],
            }),
        };
    },
});
