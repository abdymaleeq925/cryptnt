import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'b8bab437f4af4f6bac21af031b2f35dc';

const createRequest = (url) => ({
    url: `${url}&apiKey=${API_KEY}`
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://newsapi.org/v2'}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (articleName) => createRequest(`/everything?q=${articleName}`),
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi