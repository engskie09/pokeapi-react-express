import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { snakeKeys } from 'js-convert-case';

export const pokemonAPI = createApi({
    reducerPath: 'pokemonAPI',
    tagTypes: ['pokemons'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`,
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
