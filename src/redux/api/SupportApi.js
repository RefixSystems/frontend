import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const SupportApi = createApi({
    reducerPath: "SupportApi",
    baseQuery: customFetchBase,
    tagTypes: ["SUPPORTAPI"],
    endpoints: (build) => ({
      getSupport: build.query({
        query: ({page,search,role,phoneNumber}) => ({
          url: `/admin/viewSupportForms/${role}/${phoneNumber}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["SUPPORTAPI"],
      }),

      getRequestDetails: build.query({
        query: ({supportId,role}) => ({
          url: `/admin/viewCustomLaptopRequest/${supportId}/${role}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["SUPPORTAPI"],
      }),
     
      editSupport: build.mutation({
        query: ({ id,role,email, data }) => {
           return {
            url: `/admin/updateSupportForms/${id}/${role}/${email}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["SUPPORTAPI"],
      }),
      
      
     
      deleteSupport: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteSupportForms/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["SUPPORTAPI"],
      }),
    }),
  });


export const { useGetSupportQuery,useGetRequestDetailsQuery,useEditSupportMutation,useDeleteSupportMutation} = SupportApi;
