import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const IssueApi = createApi({
    reducerPath: "IssueApi",
    baseQuery: customFetchBase,
    tagTypes: ["ISSUEAPI"],
    endpoints: (build) => ({
      getIssue: build.query({
        query: ({role,device,page}) => ({
          url: `/admin/viewIssues/${role}?device=${device}&page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["ISSUEAPI"],
      }),
     
      editIssue: build.mutation({
        query: ({role,data }) => {
           return {
            url: `/admin/updateIssue/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["ISSUEAPI"],
      }),
      
     
      addIssue: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addIssue/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["ISSUEAPI"],
      }),
      
     
      deleteIssue: build.mutation({
        query: ({role,data}) => ({
          url: `/admin/deleteIssue/${role}`,
          method: "DELETE",
          body: data,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["ISSUEAPI"],
      }),
    }),
  });


export const { useGetIssueQuery,useEditIssueMutation,useDeleteIssueMutation,useAddIssueMutation} = IssueApi;
