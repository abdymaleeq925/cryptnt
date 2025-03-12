import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }), // Базовый URL вашего сервера
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (articleName) => ({
                url: `/news`, // Эндпоинт на сервере
                params: {
                    q: articleName, // Параметр запроса
                },
            }),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;