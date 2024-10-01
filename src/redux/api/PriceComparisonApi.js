import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const PriceComparisonsApi = createApi({
  reducerPath: 'PriceComparisonsApi',
  baseQuery: customFetchBase,
  tagTypes: ['PRICECOMPARISONSAPI'],
  endpoints: (build) => ({
    getPriceComparison: build.query({
      query: () => ({
        url: `/service/priceComparison`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PRICECOMPARISONSAPI'],
    }),
}),
});

export const {
  useGetPriceComparisonQuery,
  
} = PriceComparisonsApi;

