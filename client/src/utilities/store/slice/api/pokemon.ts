import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { snakeKeys } from 'js-convert-case';

import type { RootState } from '../../store';

export const pokemonAPI = createApi({
    reducerPath: 'pokemonAPI',
    tagTypes: ['pokemon', 'pokemons'],
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
            pokemons: builder.query<any, { pageSize: number; pageNumber: number; name?: string }>({
                query: ({ pageSize, pageNumber, name }) => ({
                    method: 'GET',
                    url: `pokemons?page_size=${pageSize}&page_number=${pageNumber}&name=${name}`,
                }),
                transformResponse: (response: any): any => snakeKeys(response, { recursive: true }) as any,
                providesTags: ['pokemons'],
            }),
            pokemon: builder.query<any, { name: string }>({
                query: ({ name }) => ({
                    method: 'GET',
                    url: `pokemon/${name}`,
                }),
                transformResponse: (response: any): any => snakeKeys(response, { recursive: true }) as any,
                providesTags: ['pokemon'],
            }),
        };
    },
});
