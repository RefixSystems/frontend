import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const RefurbishUserApi = createApi({
  reducerPath: 'RefurbishUserApi',
  baseQuery: customFetchBase,
  tagTypes: ['REFURBISHEDAPI'],
  endpoints: (build) => ({
    getAllRefurbished: build.query({
      query: ({ currentPage, queryString, sortOption, search }) => ({
        url: `/service/viewRefurbishedLaptops/${search}?page=${currentPage}&${queryString}&sortOrder=${sortOption}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['REFURBISHEDAPI'],
    }),

    bookRefurbished: build.mutation({
      query: (data) => ({
        url: '/service/bookRefurbishedLaptop',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['REFURBISHEDAPI'],
    }),
    addQuote: build.mutation({
      query: (data) => ({
        url: '/service/getQuote',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['REFURBISHEDAPI'],
    }),
  }),
});

export const {
  useAddQuoteMutation,
  useBookRefurbishedMutation,
  useGetAllRefurbishedQuery,
} = RefurbishUserApi;
