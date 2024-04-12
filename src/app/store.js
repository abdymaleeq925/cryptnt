import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";
import { cryptoHistoryApi } from "../services/cryptoHistoryApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        [cryptoHistoryApi.reducerPath] : cryptoHistoryApi.reducer,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware, cryptoHistoryApi.middleware, cryptoNewsApi.middleware)
})