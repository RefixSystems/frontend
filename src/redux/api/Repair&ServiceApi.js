import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const RepairServiceApi = createApi({
  reducerPath: 'RepairServiceApi',
  baseQuery: customFetchBase,
  tagTypes: ['RepairServiceApi'],
  endpoints: (build) => ({
    getIssues: build.query({
      query: ({ page, search, role }) => ({
        url: `/admin/viewIssues/${role}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['RepairServiceApi'],
    }),

    editIssues: build.mutation({
      query: ({ id, role, data }) => {
        return {
          url: `/admin/updateIssue/${id}/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['RepairServiceApi'],
    }),

    addIssues: build.mutation({
      query: ({ role, data }) => {
        return {
          url: `/admin/addIssue/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['RepairServiceApi'],
    }),
    addServiceIssues: build.mutation({
      query: ({ data }) => {
        return {
          url: `/service/bookService/`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['RepairServiceApi'],
    }),
    getServiceIssues: build.query({
      query: () => ({
        url: `/service/viewDevices`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['RepairServiceApi'],
    }),

    deleteIssues: build.mutation({
      query: ({ role, id }) => ({
        url: `/admin/deleteIssue/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['RepairServiceApi'],
    }),
  }),
});

export const {
  useGetIssuesQuery,
  useEditIssuesMutation,
  useDeleteIssuesMutation,
  useAddIssuesMutation,
  useAddServiceIssuesMutation,
  useGetServiceIssuesQuery,
} = RepairServiceApi;
