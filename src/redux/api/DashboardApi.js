import { createApi } from '@reduxjs/toolkit/query/react';
import CustomFetchBase from './CustomFetchBase';

export const DashboardApi = createApi({
  reducerPath: 'DashboardApi',
  baseQuery: CustomFetchBase,
  tagTypes: ['DASHBOARD'],
  endpoints: (build) => ({
    getDashboard: build.query({
      query: () => ({
        url: `/admin/dashboard`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['DASHBOARD'],
    }),

    getBarChartFilter: build.query({
      query: ({filter}) => ({
        url: `/admin/barChart?filter=${filter}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['DASHBOARD'],
    }),
    getSidebarAccess: build.query({
      query: ({ role,phoneNumber }) => ({
        url: `admin/verifyAccess/${role}/${phoneNumber}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['DASHBOARD'],
    }),

    resetCount: build.mutation({
      query: ({data}) => {
        return {
          url: `/admin/resetCounts`,
          method: "POST",
          body: data,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["DASHBOARD"],
    }),
    
   
  }),
});

export const { useGetDashboardQuery,useGetBarChartFilterQuery, useGetSidebarAccessQuery,useResetCountMutation } = DashboardApi;
