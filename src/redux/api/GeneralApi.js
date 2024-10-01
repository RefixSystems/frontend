import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const GeneralApi = createApi({
  reducerPath: 'GeneralApi',
  baseQuery: customFetchBase,
  tagTypes: ['GENERAL'],
  endpoints: (build) => ({
    getGeneral: build.query({
      query: ({role}) => ({
        url: `/admin/viewGeneralSettings/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['GENERAL'],
    }),

    addBanner: build.mutation({
      query: ({role,data}) => {
        return {
          url: `/admin/addCredential/${role}`,
          method: "POST",
          body: data,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["GENERAL"],
    }),

    addBrand: build.mutation({
      query: ({role,data}) => {
        return {
          url: `/admin/addCredential/${role}`,
          method: "POST",
          body: data,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["GENERAL"],
    }),

    addLink: build.mutation({
      query: ({role,data}) => {
        return {
          url: `/admin/addCredential/${role}`,
          method: "POST",
          body: data,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["GENERAL"],
    }),


    editImages: build.mutation({
      query: ({ id,role,data }) => {
         return {
          url: `/admin/updateCredential/${id}/${role}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["GENERAL"],
    }),



    deleteLaptopBrand: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteCredential/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['GENERAL'],
    }),

    deleteBanner: build.mutation({
      query: ({id, role}) => ({
        url: `/admin/deleteCredential/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['GENERAL'],
    }),
  }),
});

export const { useGetGeneralQuery, useDeleteLaptopBrandMutation,useDeleteBannerMutation,useAddBannerMutation,useAddBrandMutation,useAddLinkMutation,useEditImagesMutation} = GeneralApi;
