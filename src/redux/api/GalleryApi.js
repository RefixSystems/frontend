import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const GalleryApi = createApi({
  reducerPath: 'GalleryApi',
  baseQuery: customFetchBase,
  tagTypes: ['GALLERY'],
  endpoints: (build) => ({
    getGallery: build.query({
      query: (role) => ({
        url: `/admin/viewGallery/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['GALLERY'],
    }),

    addGallery: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addGallery/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["GALLERY"],
      }),

      addImage: build.mutation({
        query: ({role,data,id}) => {
          return {
            url: `/admin/addGalleryImage/${id}/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["GALLERY"],
      }),
      

      editImage: build.mutation({
        query: ({ id,role,galleryid,data }) => {
           return {
            url: `/admin/updateGallery/${role}/${galleryid}/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["GALLERY"],
      }),

      editGallery: build.mutation({
        query: ({role,galleryid,data }) => {
           return {
            url: `/admin/updateGallery/${role}/${galleryid}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["GALLERY"],
      }),
      


      deleteImage: build.mutation({
        query: ({role, galleryid,id }) => ({
          url: `/admin/removeGalleryImage/${role}/${galleryid}/${id}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['GALLERY'],
      }),

      deleteGallery: build.mutation({
        query: ({role, galleryid}) => ({
          url: `/admin/deleteGallery/${galleryid}/${role}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['GALLERY'],
      }),

    // deleteGallery: build.mutation({
    //   query: ({ id, role }) => ({
    //     url: `/admin/deleteUser/${id}/${role}`,
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //   }),
    //   invalidatesTags: ['GALLERY'],
    // }),
  }),
});

export const { useGetGalleryQuery, useAddGalleryMutation,useAddImageMutation,useEditImageMutation,useEditGalleryMutation,useDeleteImageMutation ,useDeleteGalleryMutation} = GalleryApi;
