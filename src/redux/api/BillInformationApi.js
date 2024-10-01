import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const BillInformationApi = createApi({
  reducerPath: 'BillInformationApi',
  baseQuery: customFetchBase,
  tagTypes: ['BILLINFORMATION'],
  endpoints: (build) => ({
    getBillInformation: build.query({
      query: ({ id, role }) => ({
        url: `/admin/viewUserDetails/${id}/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['BILLINFORMATION'],
    }),

    getComponent: build.query({
      query: ({ role }) => ({
        url: `/admin/viewComponents/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['BILLINFORMATION'],
    }),

    updateBill: build.mutation({
      query: ({ billid, id, role, data }) => {
        return {
          url: `/admin/updateBill/${billid}/${id}/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['BILLINFORMATION'],
    }),

    addComponent: build.mutation({
      query: ({ id, role, data }) => {
        return {
          url: `/admin/generateBill/${id}/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['BILLINFORMATION'],
    }),

    CalculateCharges: build.mutation({
      query: ({ id, role, data }) => {
        return {
          url: `/admin/calculateCharges/${id}/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['BILLINFORMATION'],
    }),

    deleteBillInformation: build.mutation({
      query: ({ billid, id, role }) => ({
        url: `/admin/removeAddedComponents/${billid}/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['BILLINFORMATION'],
    }),
  }),
});

export const {
  useGetBillInformationQuery,
  useGetComponentQuery,
  useDeleteBillInformationMutation,
  useAddComponentMutation,
  useCalculateChargesMutation,
  useUpdateBillMutation,
} = BillInformationApi;
