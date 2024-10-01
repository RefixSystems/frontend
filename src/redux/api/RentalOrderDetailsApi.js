import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const RentalOrderDetailsApi = createApi({
  reducerPath: "RentalOrderDetailsApi",
  baseQuery: customFetchBase,
  tagTypes: ["RENTALORDERDETAILS"],
  endpoints: (build) => ({
    getRentalOrderDetails: build.query({
      query: ({ requestId,role,page,limit }) => ({
        url: `/admin/viewOrderDetailsRental/${role}?requestId=${requestId}&limit=${limit}&page=${page}`,
      
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["RENTALORDERDETAILS"],
    }),

    getRepairOrderDetails:build.query({
      query:({requestId,role,page,limit})=>(
        {
        
          url: `/admin/viewOrderDetailsRepair/${role}?requestId=${requestId}&limit=${limit}&page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          providesTags: ["REPAIRORDERDETAILS"],
        }),
      
    }),
    getRefurbishedOrderDetails:build.query({
      query:({requestId,role,limit,page})=>(
        {
          url: `/admin/viewOrderDetailsRefurbished/${role}?requestId=${requestId}&limit=${limit}&page=${page}`,
         
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          providesTags: ["REPAIRORDERDETAILS"],
        }),
      
    })
  }),
});

export const { useGetRentalOrderDetailsQuery,useGetRepairOrderDetailsQuery,useGetRefurbishedOrderDetailsQuery } = RentalOrderDetailsApi;