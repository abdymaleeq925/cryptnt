import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const createRequest = (url) => ({
    url: `${url}&apiKey=${process.env.REACT_APP_CRYPTO_NEWS_API_KEY}`
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