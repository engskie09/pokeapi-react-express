import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Auth } from '../../model/trainer';
import type { RootState } from '../../store';

export const trainerAPI = createApi({
    reducerPath: 'trainerAPI',
    tagTypes: ['auth'],
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
            login: builder.mutation<Auth, Credential>({
                query: ({ ...payload }) => ({
                    method: 'POST',
                    url: 'login',
                    body: payload,
                }),
                invalidatesTags: ['auth'],
            }),

            register: builder.mutation<void, Credential>({
                query: ({ ...payload }) => ({
                    method: 'POST',
                    url: 'register',
                    body: payload,
                }),
            }),

            verifyToken: builder.mutation({
                query: () => ({
                    method: 'GET',
                    url: `verify-token`,
                    invalidatesTags: ['auth'],
                }),
            }),
        };
    },
});
