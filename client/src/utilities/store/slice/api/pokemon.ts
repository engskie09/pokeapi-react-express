import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { snakeKeys } from 'js-convert-case';
import { Favorite } from '../../model/favorite';

import type { RootState } from '../../store';

export const pokemonAPI = createApi({
    reducerPath: 'pokemonAPI',
    tagTypes: ['pokemon', 'pokemons', 'favorites'],
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
                providesTags: ['pokemons'],
            }),

            pokemon: builder.query<any, { name: string }>({
                query: ({ name }) => ({
                    method: 'GET',
                    url: `pokemon/${name}`,
                }),
                providesTags: ['pokemon'],
            }),

            favorites: builder.query<Favorite[], void>({
                query: () => ({
                    method: 'GET',
                    url: 'favorites',
                }),
                providesTags: ['favorites'],
            }),

            addFavorite: builder.mutation<void, { pokemon: string; url: string }>({
                query: ({ ...payload }) => ({
                    method: 'POST',
                    url: 'favorite',
                    body: payload,
                }),
                invalidatesTags: ['favorites', 'pokemon'],
            }),

            deleteFavorite: builder.mutation<void, { pokemon: string }>({
                query: ({ pokemon }) => ({
                    method: 'DELETE',
                    url: `favorite/${pokemon}`,
                }),
                invalidatesTags: ['favorites', 'pokemon'],
            }),
        };
    },
});
