import { createApi } from '@reduxjs/toolkit/query/react';
import { setUser } from '../../redux/features/userSlice';
import customFetchBase from './CustomFetchBase';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/admin/login',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['AuthApi'],
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: '/user/verifyOtp',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['AuthApi'],
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: '/user/signUp',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['AuthApi'],
    }),
    getViewUserProfile: builder.query({
      query: (phoneNumber) => ({
        url: `/user/viewUserProfile/${phoneNumber}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['AuthApi'],
    }),
    getViewMyQuotes: builder.query({
      query: ({ phoneNumber, page }) => ({
        url: `/user/viewMyQuotes/${phoneNumber}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['AuthApi'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useGetViewUserProfileQuery,
  useGetViewMyQuotesQuery,
  useCreateAccountMutation,
} = AuthApi;
