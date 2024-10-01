import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const LogoApi = createApi({
  reducerPath: 'LogoApi',
  baseQuery: customFetchBase,
  tagTypes: ['LOGO'],
  endpoints: (build) => ({
    getLogo: build.query({
      query: () => ({
        url: `/admin/viewLogo`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['LOGO'],
    }),
  }),
});

export const { useGetLogoQuery } = LogoApi;
