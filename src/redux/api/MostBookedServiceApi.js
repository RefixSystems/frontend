import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const MostBookedServiceApi = createApi({
    reducerPath: "MostBookedServiceApi",
    baseQuery: customFetchBase,
    tagTypes: ["MOSTBOOKRDSERVICEAPI"],
    endpoints: (build) => ({
      getMostBookedService: build.query({
        query: ({role,search,page}) => ({
          url: `/admin/viewMostBookedService/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["MOSTBOOKRDSERVICEAPI"],
      }),
     
      editMostBookedService: build.mutation({
        query: ({id,role,data }) => {
           return {
            url: `/admin/updateMostBookedService/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["MOSTBOOKRDSERVICEAPI"],
      }),
      
     
      addMostBookedService: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addMostBookedService/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["MOSTBOOKRDSERVICEAPI"],
      }),
      
     
      deleteMostBookedService: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteMostBookedService/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["MOSTBOOKRDSERVICEAPI"],
      }),
    }),
  });


export const { useGetMostBookedServiceQuery,useEditMostBookedServiceMutation,useDeleteMostBookedServiceMutation,useAddMostBookedServiceMutation} = MostBookedServiceApi;
