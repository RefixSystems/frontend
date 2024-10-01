import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const NotificationAPi = createApi({
  reducerPath: 'NotificationAPi',
  baseQuery: customFetchBase,
  tagTypes: ['NOTIFICATIONAPI'],
  endpoints: (build) => ({
    getNotification: build.query({
      query: ({ role,phoneNumber}) => ({
        url: `/admin/viewNotifications/${role}/${phoneNumber}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['NOTIFICATIONAPI'],
    }),

    deleteNotification: build.mutation({
      query: ({role,phoneNumber}) => ({
        url: `/admin/clearNotifications/${role}/${phoneNumber}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['NOTIFICATIONAPI'],
    }),
  }),
});

export const { useGetNotificationQuery, useDeleteNotificationMutation } =
  NotificationAPi;
