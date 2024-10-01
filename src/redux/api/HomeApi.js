import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const HomeApi = createApi({
  reducerPath: 'HomeApi',
  baseQuery: customFetchBase,
  tagTypes: ['HOMEAPI'],
  endpoints: (build) => ({
    getHomeDetails: build.query({
      query: ({ phoneNumber }) => ({
        url: `/service/homePage/${phoneNumber ?? ''}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['HOMEAPI'],
    }),
    getSearchSuggest: build.query({
      query: ({ query }) => ({
        url: `/service/mainSearch/${query}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['HOMEAPI'],
    }),
    getGalleryDetails: build.query({
      query: () => ({
        url: `/service/viewGallery`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['HOMEAPI'],
    }),

    chatBot: build.mutation({
      query: ({ data }) => {
        return {
          url: `/service/chatBot`,
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        };
      },
      invalidatesTags: ['HOMEAPI'],
    }),
    contactUs: build.mutation({
      query: (data) => {
        return {
          url: `user/support`,
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        };
      },
      invalidatesTags: ['HOMEAPI'],
    }),
  }),
});

export const {
  useGetHomeDetailsQuery,
  useGetSearchSuggestQuery,
  useChatBotMutation,
  useContactUsMutation,
  useGetGalleryDetailsQuery,
} = HomeApi;
