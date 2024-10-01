import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const CredentialsApi = createApi({
  reducerPath: 'CredentialsApi',
  baseQuery: customFetchBase,
  tagTypes: ['CREDENTIALSAPI'],
  endpoints: (build) => ({
    getCredentials: build.query({
      query: ({ page, search, role }) => ({
        url: `/admin/viewCredentials/${role}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['CREDENTIALSAPI'],
    }),

    getUserCreationById: build.query({
      query: ({ id, role }) => ({
        url: `/admin/viewRentalLaptopById/${id}/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['RENTALAPI'],
    }),

    editCredentials: build.mutation({
      query: ({ id, role, data }) => {
        return {
          url: `/admin/updateCredential/${id}/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['CREDENTIALSAPI'],
    }),

    addCredentials: build.mutation({
      query: ({ role, data }) => {
        return {
          url: `/admin/addDevice/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['CREDENTIALSAPI'],
    }),

    deleteCredentials: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteDevice/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['CREDENTIALSAPI'],
    }),
  }),
});

export const {
  useGetCredentialsQuery,
  useEditCredentialsMutation,
  useDeleteCredentialsMutation,
  useAddCredentialsMutation,
} = CredentialsApi;
