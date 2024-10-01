import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const RentApi = createApi({
  reducerPath: 'RentApi',
  baseQuery: customFetchBase,
  tagTypes: ['RENTAPI'],
  endpoints: (build) => ({
    getRents: build.query({
      query: ({ currentPage, queryString, sortOption, search }) => ({
        url: `/service/viewRentalLaptops/${search}?page=${currentPage}&${queryString}&sortOrder=${sortOption}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['RENTAPI'],
    }),

    getProductReview: build.query({
      query: ({ currentPage, id , type}) => ({
        url: `/service/viewProductReviews/${id}?type=${type}&page=${currentPage}&limit=3`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['RENTAPI'],
    }),

    addRentalCustom: build.mutation({
      query: (data) => ({
        url: `/service/customLaptopRequest`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    bookRent: build.mutation({
      query: (data) => ({
        url: '/service/bookRentLaptop',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
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
    }),
  }),
});

export const { useGetRentsQuery, useBookRentMutation, useAddQuoteMutation ,useAddRentalCustomMutation,useGetProductReviewQuery} =
  RentApi;
