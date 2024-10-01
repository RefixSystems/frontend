import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const AboutUsApi = createApi({
  reducerPath: 'AboutUsApi',
  baseQuery: customFetchBase,
  tagTypes: ['ABOUTUSAPI'],
  endpoints: (build) => ({
    getAboutUs: build.query({
      query: () => ({
        url: `/service/aboutUs`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ABOUTUSAPI'],
    }),

    getAboutUsAdmin: build.query({
      query: ({ role }) => ({
        url: `/admin/aboutUs/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ABOUTUSAPI'],
    }),

    editAboutUs: build.mutation({
      query: ({ role, data }) => {
        return {
          url: `/admin/updateAboutUs/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['ABOUTUSAPI'],
    }),
  }),
});

export const {
  useEditAboutUsMutation,
  useGetAboutUsAdminQuery,
  useGetAboutUsQuery,
} = AboutUsApi;
