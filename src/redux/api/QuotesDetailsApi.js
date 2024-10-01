import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const QuotesDetailsApi = createApi({
  reducerPath: "QuotesDetailsApi",
  baseQuery: customFetchBase,
  tagTypes: ["QUOTESDETAILSAPI"],
  endpoints: (build) => ({
    getQuotesDetails: build.query({
      query: ({ requestId,role }) => ({
        url: `/admin/viewOrderDetailsRental/${role}?requestId=${requestId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["QUOTESDETAILSAPI"],
    }),

    getRepairOrderDetails: build.query({
      query: ({ requestId,role }) => ({
        url: `/admin/viewOrderDetailsRepair/${role}?requestId=${requestId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["QUOTESDETAILSAPI"],
    }),

    getRefurbishedOrderDetails: build.query({
      query: ({ requestId,role }) => ({
        url: `/admin/viewOrderDetailsRefurbished/${role}?requestId=${requestId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["QUOTESDETAILSAPI"],
    }),
  }),
});

export const { useGetQuotesDetailsQuery ,useGetRepairOrderDetailsQuery, useGetRefurbishedOrderDetailsQuery} = QuotesDetailsApi;
