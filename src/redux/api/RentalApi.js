import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const RentalApi = createApi({
    reducerPath: "RentalApi",
    baseQuery: customFetchBase,
    tagTypes: ["RENTALAPI"],
    endpoints: (build) => ({
      getRental: build.query({
        query: ({page,search,role}) => ({
          url: `/admin/viewRentalLaptops/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["RENTALAPI"],
      }),

      getRentalById: build.query({
        query: ({id,role}) => ({
          url: `/admin/viewRentalLaptopById/${id}/${role}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["RENTALAPI"],
      }),
     
      editRental: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateRentalLaptop/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["RENTALAPI"],
      }),
      
     
      addRental: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addRentalLaptop/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["RENTALAPI"],
      }),
      
      addRentalOrder: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addOrder/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["RENTALAPI"],
      }),
      

      addImportRental: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addBulkRentalLaptop/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["RENTALAPI"],
      }),
      
     
      deleteRental: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteRentalLaptop/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["RENTALAPI"],
      }),
    }),
  });


export const { useGetRentalQuery,useGetRentalByIdQuery,useEditRentalMutation,useDeleteRentalMutation,useAddRentalMutation,useAddRentalOrderMutation,useAddImportRentalMutation} = RentalApi;
