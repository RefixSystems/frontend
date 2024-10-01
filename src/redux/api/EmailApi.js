import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const EmailApi = createApi({
  reducerPath: 'EmailApi',
  baseQuery: customFetchBase,
  tagTypes: ['EMAIL'],
  endpoints: (build) => ({
    getEmail: build.query({
      query: ({role,search,page}) => ({
        url: `/admin/viewSentEmails/${role}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['EMAIL'],
    }),

    getTemplateData: build.query({
        query: ({role}) => ({
          url: `/admin/viewTemplates/${role}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }),
        providesTags: ['EMAIL'],
      }),

      getTemplateDetails: build.query({
        query: ({role,template}) => ({
          url: `/admin/viewTemplateDetails/${role}/${template}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }),
        providesTags: ['EMAIL'],
      }),

      sendMail: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/sendEmail/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["EMAIL"],
      }),

      deleteEmail: build.mutation({
        query: ({ id, role }) => ({
          url: `/admin/deleteEmail/${id}/${role}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['EMAIL'],
      }),
  }),
});

export const { useGetEmailQuery,useGetTemplateDataQuery, useGetTemplateDetailsQuery,useSendMailMutation,useDeleteEmailMutation } = EmailApi;
