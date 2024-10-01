import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const ServiceAreaApi = createApi({
    reducerPath: "ServiceAreaApi",
    baseQuery: customFetchBase,
    tagTypes: ["SERVICEAREA"],
    endpoints: (build) => ({
      getServiceArea: build.query({
        query: ({role,page,search}) => ({
          url: `/admin/viewServiceAreas/${role}/${search}?page=${page}&limit=20`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["SERVICEAREA"],
      }),
     
      editServiceArea: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateServiceArea/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["SERVICEAREA"],
      }),
      
     
      addServiceArea: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addServiceArea/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["SERVICEAREA"],
      }),
      
     
      deleteServiceArea: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteDevice/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["SERVICEAREA"],
      }),
    }),
  });


export const { useGetServiceAreaQuery,useEditServiceAreaMutation,useDeleteServiceAreaMutation,useAddServiceAreaMutation} = ServiceAreaApi;
