import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const PreviewApi = createApi({
  reducerPath: 'PreviewApi',
  baseQuery: customFetchBase,
  tagTypes: ['PREVIEW'],
  endpoints: (build) => ({
    getPreview: build.query({
      query: ({ requestId, role }) => ({
        url: `/admin/viewBill/${requestId}/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PREVIEW'],
    }),

   

    addComponent: build.mutation({
      query: ({id,role,data}) => {
        return {
          url: `/admin/generateBill/${id}/${role}`,
          method: "POST",
          body: data,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["PREVIEW"],
    }),




    deletePreview: build.mutation({
      query: ({ billid,id, role }) => ({
        url: `/admin/removeAddedComponents/${billid}/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Preview'],
    }),
  }),
});

export const { useGetPreviewQuery, useGetComponentQuery,useDeletePreviewMutation ,useAddComponentMutation,useCalculateChargesMutation} = PreviewApi;
