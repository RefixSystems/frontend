import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const ReviewsApi = createApi({
  reducerPath: 'ReviewsApi',
  baseQuery: customFetchBase,
  tagTypes: ['REVIEWSAPI'],
  endpoints: (build) => ({
    getReviews: build.query({
      query: ({role,phoneNumber,search,page }) => ({
        url: `/admin/viewReviews/${role}/${phoneNumber}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['REVIEWSAPI'],
    }),
    editReviews: build.mutation({
      query: ({ id, role, data }) => ({
        url: `/admin/updateReview/${id}/${role}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['REVIEWSAPI'],
    }),

    addReview: build.mutation({
      query: ({ data, role }) => {
        return {
          url: `/admin/addReview/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['REVIEWSAPI'],
    }),
    deleteReviews: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteReview/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['REVIEWSAPI'],
    }),
    getUserReviews: build.query({
      query: () => ({
        url: `/user/viewReviews`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['REVIEWSAPI'],
    }),

    addProductReview: build.mutation({
      query: ({ data }) => ({
        url: `user/review`,
        method: 'POST',
        body: data,
        headers: {},
      }),
      invalidatesTags: ['REVIEWSAPI'],
    }),
    addProductsReview: build.mutation({
      query: ({ data }) => ({
        url: `service/productReview`,
        method: 'POST',
        body: data,
        headers: {} 
        
      }),
      invalidatesTags: ['PRODUCTREVIEWAPI'],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useEditReviewsMutation,
  useDeleteReviewsMutation,
  useGetUserReviewsQuery,
  useAddReviewMutation,
  useAddProductReviewMutation,
   useAddProductsReviewMutation
} = ReviewsApi;
