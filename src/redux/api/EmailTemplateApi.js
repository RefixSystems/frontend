import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const EmailTemplateApi = createApi({
    reducerPath: "EmailTemplateApi",
    baseQuery: customFetchBase,
    tagTypes: ["EMAILTEMPLATE"],
    endpoints: (build) => ({
      getEmailTemplate: build.query({
        query: ({role,page,search}) => ({
          url: `/admin/viewEmailTemplates/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["EMAILTEMPLATE"],
      }),
     
      editEmailTemplate: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateEmailTemplate/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["EMAILTEMPLATE"],
      }),
      
     
      addEmailTemplate: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addEmailTemplate/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["EMAILTEMPLATE"],
      }),
      
     
      deleteEmailTemplate: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteEmailTemplate/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["EMAILTEMPLATE"],
      }),
    }),
  });


export const { useGetEmailTemplateQuery,useEditEmailTemplateMutation,useDeleteEmailTemplateMutation,useAddEmailTemplateMutation} = EmailTemplateApi;
