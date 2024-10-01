import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const ProductreviewApi = createApi({
  reducerPath: 'ProductreviewApi',
  baseQuery: customFetchBase,
  tagTypes: ['PRODUCTREVIEWAPI'],
  endpoints: (build) => ({
    getProductreview: build.query({
      query: ({ page, search,role ,phoneNumber}) => ({
        url: `/admin/viewProductReviews/${role}/${phoneNumber}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PRODUCTREVIEWAPI'],
    }),
    editProductreview: build.mutation({
      query: ({ id,role,data }) => ({
        url: `/admin/updateProductReview/${id}/${role}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['PRODUCTREVIEWAPI'],
    }),

    addReview: build.mutation({
      query: ({role,data}) => {
        return {
          url: `/admin/productReview/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['PRODUCTREVIEWAPI'],
    }),
    deleteProductreview: build.mutation({
      query: ({id,role}) => ({
        url: `/admin/deleteProductReview/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['PRODUCTREVIEWAPI'],
    }),

    
     }),
});

export const {
  useGetProductreviewQuery,
  useEditProductreviewMutation,
  useDeleteProductreviewMutation,
  useAddReviewMutation,
 
} = ProductreviewApi;
