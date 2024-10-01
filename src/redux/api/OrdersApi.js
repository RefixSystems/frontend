import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const OrdersApi = createApi({
  reducerPath: 'OrdersApi',
  baseQuery: customFetchBase,
  tagTypes: ['ORDERSAPI'],
  endpoints: (build) => ({
    getOrders: build.query({
      query: ({
        page,
        search,
        assigned,
        role,
        startDate,
        endDate,
        dayFilter,
        phoneNumber,
      }) => ({
        url: `/admin/viewOrders/${role}/${phoneNumber}/${search}?page=${page}&assignedTo=${assigned}&startDate=${startDate}&endDate=${endDate}&dayFilter=${dayFilter}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getExportData: build.query({
      query: ({
        role,
        startDate,
        endDate,
        dayFilter,
        type,
        limit,
        page,
        search,
      }) => ({
        url: `admin/exportData/${role}/${search}?type=${type}&dayFilter=${dayFilter}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getExportDataEmployee: build.query({
      query: ({
        role,
        startDate,
        endDate,
        dayFilter,
        type,
        limit,
        page,
        search,
        email,
      }) => ({
        url: `admin/exportData/${role}/${search}?type=${type}&dayFilter=${dayFilter}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${page}&email=${email}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getExportDataOrders: build.query({
      query: ({
        role,
        startDate,
        endDate,
        dayFilter,
        assigned,
        type,
        limit,
        page,
        email,
        search,
      }) => ({
        url: `admin/exportData/${role}/${search}?type=${type}&email=${email}&dayFilter=${dayFilter}&assignedTo=${assigned}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getExportDataDownload: build.query({
      query: ({ role, startDate, endDate, dayFilter, type, search }) => ({
        url: `admin/exportData/${role}/${search}?type=${type}&dayFilter=${dayFilter}&startDate=${startDate}&endDate=${endDate}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getExportDataDownloadEmployee: build.query({
      query: ({
        role,
        startDate,
        endDate,
        dayFilter,
        type,
        search,
        email,
      }) => ({
        url: `admin/exportData/${role}/${search}?type=${type}&dayFilter=${dayFilter}&startDate=${startDate}&endDate=${endDate}&email=${email}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getExportDataDownloadOrders: build.query({
      query: ({
        role,
        startDate,
        endDate,
        dayFilter,
        type,
        assigned,
        search,
        email,
      }) => ({
        url: `admin/exportData/${role}/${search}?type=${type}&assignedTo=${assigned}&dayFilter=${dayFilter}&startDate=${startDate}&endDate=${endDate}&email=${email}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getOrderById: build.query({
      query: ({ id, role }) => ({
        url: `/admin/viewOrderById/${id}/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getOrderAssigned: build.query({
      query: ({ role }) => ({
        url: `/admin/viewAssignedEmployeesList/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    getEmployeeRole: build.query({
      query: ({ role }) => ({
        url: `/admin/getEmployee/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ORDERSAPI'],
    }),

    editOrders: build.mutation({
      query: ({ id, data, role }) => {
        return {
          url: `/admin/updateOrder/${id}/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['ORDERSAPI'],
    }),

    deleteOrders: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteOrder/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['ORDERSAPI'],
    }),

    sendPinCode: build.mutation({
      query: (data) => ({
        url: '/service/verifyServiceArea',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    acceptOtp: build.mutation({
      query: (data) => ({
        url: '/admin/sendCustomerVerificationCode',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    confirmOtp: build.mutation({
      query: (data) => ({
        url: '/admin/verifyCustomer',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetExportDataQuery,
  useGetExportDataEmployeeQuery,
  useGetExportDataOrdersQuery,
  useSendPinCodeMutation,
  useGetEmployeeRoleQuery,
  useGetOrderByIdQuery,
  useGetOrderAssignedQuery,
  useEditOrdersMutation,
  useDeleteOrdersMutation,
  useAcceptOtpMutation,
  useConfirmOtpMutation,
  useGetExportDataDownloadQuery,
  useGetExportDataDownloadEmployeeQuery,
  useGetExportDataDownloadOrdersQuery,
} = OrdersApi;
