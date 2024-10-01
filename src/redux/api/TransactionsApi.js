import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const TransactionsApi = createApi({
  reducerPath: "Transactions",
  baseQuery: customFetchBase,
  tagTypes: ["TRANSACTIONS"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({page,search,role,phoneNumber}) => ({
        url: `/admin/viewTransactions/${role}/${phoneNumber}/${search}?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["TRANSACTIONS"],
    }),

    getTransactionIDDetails: builder.query({
      query: ({ requestId,role}) => ({
        url: `/admin/viewTransactionDetails/${requestId}/${role}`,
      
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["TRANSACTIONS"],
    }),

    addTransactions: builder.mutation({
      query: ({ phoneNumber, upiId, modeOfPayment, amount,transactionId,image,paidOn }) => {
        const formData = new FormData();
        formData.append('phoneNumber', phoneNumber);
        formData.append('upiId', upiId);
        formData.append('modeOfPayment', modeOfPayment);
        formData.append('amount', amount);
        formData.append('transactionId', transactionId);
        formData.append('paidOn', paidOn);
        formData.append('image', image);
    
        return {
          url: `/admin/addTransactions`,
          method: "POST",
          body: formData,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["TRANSACTIONS"],
    }),
    

    deleteTransactions: builder.mutation({
      query: ({id,role}) => ({
        url: `/admin/deleteTransaction/${id}/${role}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["TRANSACTIONS"],
    }),



  
  }),
});

export const { useGetTransactionsQuery,useDeleteTransactionsMutation,useAddTransactionsMutation,useGetTransactionIDDetailsQuery} = TransactionsApi;
