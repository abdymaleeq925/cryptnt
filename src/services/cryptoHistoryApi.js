import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '2be63f1387msh30d4afc3eef9784p176d6bjsn2e890d89abf5',
    'X-RapidAPI-Host':  'coinranking1.p.rapidapi.com'
}

const createRequest = ({url, params}) => ({
    url, params, headers : cryptoApiHeaders
})

export const cryptoHistoryApi = createApi ({
    reducerPath: 'cryptoHistoryApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://coinranking1.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest({
                url: `coin/${coinId}/history`,
                params: {timePeriod}
            })
        })
    })
})

export const { useGetCryptoHistoryQuery } = cryptoHistoryApi
