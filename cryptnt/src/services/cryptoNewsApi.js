import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cryptnt.vercel.app/api' }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (articleName) => ({
                url: `/news`,
                params: {
                    q: articleName,
                },
            }),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;