import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const CustomLaptopRequestsApi = createApi({
    reducerPath: "CustomLaptopRequestsApi",
    baseQuery: customFetchBase,
    tagTypes: ["CUSTOMLAPTOPREQUESTS"],
    endpoints: (build) => ({
      getCustomLaptopRequests: build.query({
        query: ({role,page,search}) => ({
          url: `/admin/viewCustomLaptopRequests/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["CUSTOMLAPTOPREQUESTS"],
      }),
     
      editCustomLaptopRequests: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateCustomLaptopRequest/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["CUSTOMLAPTOPREQUESTS"],
      }),
      
     
      deleteCustomLaptopRequests: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteCustomLaptopReques/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["CUSTOMLAPTOPREQUESTS"],
      }),
    }),
  });


export const { useGetCustomLaptopRequestsQuery,useEditCustomLaptopRequestsMutation,useDeleteCustomLaptopRequestsMutation} = CustomLaptopRequestsApi;
