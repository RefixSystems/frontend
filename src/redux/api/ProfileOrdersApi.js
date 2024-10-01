import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const ProfileOrdersApi = createApi({
  reducerPath: 'ProfileOrdersApi',
  baseQuery: customFetchBase,
  tagTypes: ['PROFILEAPI'],
  endpoints: (build) => ({
    getViewUserOrder: build.query({
      query: ({ phoneNumber, page }) => ({
        url: `/user/myActivities/${phoneNumber}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PROFILEAPI'],
    }),

    getUserDetails: build.query({
      query: ({ phoneNumber }) => ({
        url: `/user/viewUserProfile/${phoneNumber}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PROFILEAPI'],
    }),
  
    verifyEmailOTP: build.mutation({
      query: (data) => ({
        url: '/user/sendVerificationEmail',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),

    otpSumbitEmail: build.mutation({
      query: (data) => ({
        url: '/user/verifyEmail',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),

    verifyOTPPassword: build.mutation({
      query: (data) => ({
        url: '/user/verifyResetPasswordOtp',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),

    updateUserPassword: build.mutation({
      query: (data) => ({
        url: `/user/resetPassword`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),

    updateUserAddress: build.mutation({
      query: ({ data, phoneNumber }) => ({
        url: `/user/updateUserAddress/${phoneNumber}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),

    updateUserProfile: build.mutation({
      query: (data) => ({
        url: `/user/updateUserProfile`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),

    deleteUserAddress: build.mutation({
      query: ({ data, phoneNumber }) => ({
        url: `/user/deleteUserAddress/${phoneNumber}`,
        method: 'DELETE',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),

    deleteProfileImage: build.mutation({
      query: ({ phoneNumber }) => ({
        url: `/user/deleteUserImage/${phoneNumber}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['PROFILEAPI'],
    }),
  }),
});

export const {
  useGetViewUserOrderQuery,
  useUpdateUserProfileMutation,
  useGetUserDetailsQuery,
  useOtpSumbitEmailMutation,
  useGetProfileQuery,
  useVerifyEmailOTPMutation,
  useVerifyOTPPasswordMutation,
  useUpdateUserPasswordMutation,
  useDeleteProfileImageMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
} = ProfileOrdersApi;
