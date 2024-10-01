import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const RefurbishedApi = createApi({
    reducerPath: "RefurbishedApi",
    baseQuery: customFetchBase,
    tagTypes: ["REFURBISHEDAPI"],
    endpoints: (build) => ({
      getRefurbished: build.query({
        query: ({page,search,role}) => ({
          url: `/admin/viewRefurbishedLaptops/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["REFURBISHEDAPI"],
      }),

      getRefurbishedById: build.query({
        query: ({id,role}) => ({
          url: `/admin/viewRefurbishedLaptopById/${id}/${role}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["REFURBISHEDAPI"],
      }),
     
      editRefurbished: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateRefurbishedLaptop/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["REFURBISHEDAPI"],
      }),
      
     
      addRefurbished: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addRefurbishedLaptop/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["REFURBISHEDAPI"],
      }),
      
      addImportRefurbished: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addBulkRefurbishedLaptop/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["REFURBISHEDAPI"],
      }),
           
      deleteRefurbished: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteRefurbishedLaptop/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["REFURBISHEDAPI"],
      }),
    }),
  });


export const { useGetRefurbishedQuery,useGetRefurbishedByIdQuery,useEditRefurbishedMutation,useDeleteRefurbishedMutation,useAddRefurbishedMutation,useAddImportRefurbishedMutation} = RefurbishedApi;
