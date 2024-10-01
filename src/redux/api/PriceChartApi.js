import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const PriceChartAPi = createApi({
  reducerPath: 'PriceChartApi',
  baseQuery: customFetchBase,
  tagTypes: ['PRICECHARTAPI'],
  endpoints: (build) => ({
    getPriceChart: build.query({
      query: () => ({
        url: `/service/viewPriceChart`, 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PRICECHARTAPI'],
    }),
getPriceCharts:
build.query({
  query: ({query }) => ({
    url: `/service/viewPriceChart/${query}`, 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }),
  providesTags: ['PRICECHARTAPI'],
}),


    getPriceChartsAdmin: build.query({
      query: ({ page, search, role }) => ({
        url: `/admin/viewPriceChart/${role}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PRICECHARTAPI'],
    }),

    getPriceChartRoles: build.query({
      query: ({role }) => ({
        url: `/admin/viewProductComponents/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['PRICECHARTAPI'],
    }),

    addPriceChart: build.mutation({
      query: ({ role, data }) => {
        return {
          url: `/admin/addNewProductPrice/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['PRICECHARTAPI'],
    }),

    editPriceChart: build.mutation({
      query: ({ id, role, data }) => {
        return {
          url: `/admin/updateProductPrice/${id}/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['PRICECHARTAPI'],
    }),

      deletePriceChart: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteProductPrice/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["PRICECHARTAPI"],
      }),
  }),
});

export const {
  useGetPriceChartQuery,
  useGetPriceChartsAdminQuery,
  useGetPriceChartRolesQuery,
  useAddPriceChartMutation,
  useEditPriceChartMutation,
  useDeletePriceChartMutation,
  useGetPriceChartsQuery
} = PriceChartAPi;
