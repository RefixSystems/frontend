import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const PriceComparisonApi = createApi({
    reducerPath: "PriceComparisonApi",
    baseQuery: customFetchBase,
    tagTypes: ["PRICECOMPARISON"],
    endpoints: (build) => ({
      getPriceComparison: build.query({
        query: ({role,page,search}) => ({
          url: `/admin/viewPriceComparison/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["PRICECOMPARISON"],
      }),
     
      editPriceComparison: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updatePriceComparison/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["PRICECOMPARISON"],
      }),
      
     
      addPriceComparison: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addPriceComparison/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["PRICECOMPARISON"],
      }),
      
     
      deletePriceComparison: build.mutation({
        query: ({id,role}) => ({
          url: `admin/deletePriceComparison/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["PRICECOMPARISON"],
      }),
    }),
  });


export const { useGetPriceComparisonQuery,useEditPriceComparisonMutation,useDeletePriceComparisonMutation,useAddPriceComparisonMutation} = PriceComparisonApi;
