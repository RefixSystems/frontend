import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const QuotesApi = createApi({
    reducerPath: "QuotesApi",
    baseQuery: customFetchBase,
    tagTypes: ["QUOTESAPI"],
    endpoints: (build) => ({
      getQuotes: build.query({
        query: ({page,search,role,phoneNumber}) => ({
          url: `/admin/viewQuotes/${role}/${phoneNumber}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["QUOTESAPI"],
      }),
     
      editQuotes: build.mutation({
        query: ({ id,role, data }) => {
           return {
            url: `/admin/updateQuote/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["QUOTESAPI"],
      }),
      
      
     
      deleteQuotes: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteQuote/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["QUOTESAPI"],
      }),
    }),
  });


export const { useGetQuotesQuery,useEditQuotesMutation,useDeleteQuotesMutation} = QuotesApi;
