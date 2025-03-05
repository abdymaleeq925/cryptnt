import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key' : '2be63f1387msh30d4afc3eef9784p176d6bjsn2e890d89abf5',
    'X-RapidAPI-Host' : 'coinranking1.p.rapidapi.com'
}

const createRequest = (url) => ({
    url, headers: cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://coinranking1.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (id) => createRequest(`/coin/${id}`)
        }),
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi