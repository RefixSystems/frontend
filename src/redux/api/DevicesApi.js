import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const DevicesApi = createApi({
    reducerPath: "DevicesApi",
    baseQuery: customFetchBase,
    tagTypes: ["DEVICESAPI"],
    endpoints: (build) => ({
      getDevices: build.query({
        query: ({role,page,search}) => ({
          url: `/admin/viewDevices/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["DEVICESAPI"],
      }),
     
      editDevices: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateDevice/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["DEVICESAPI"],
      }),
      
     
      addDevices: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addDevice/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["DEVICESAPI"],
      }),
      
     
      deleteDevices: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteDevice/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["DEVICESAPI"],
      }),
    }),
  });


export const { useGetDevicesQuery,useEditDevicesMutation,useDeleteDevicesMutation,useAddDevicesMutation} = DevicesApi;
