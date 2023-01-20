import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Auth } from '../../model/trainer';

export const trainerAPI = createApi({
    reducerPath: 'trainerAPI',
    tagTypes: ['auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`,
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
        };
    },
});
