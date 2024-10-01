import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const FaqAPi = createApi({
  reducerPath: 'FaqApi',
  baseQuery: customFetchBase,
  tagTypes: ['FAQAPI'],
  endpoints: (build) => ({
    getFaq: build.query({
      query: () => ({
        url: `/service/viewFaq`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['FAQAPI'],
    }),

    getFaqParticular: build.query({
      query: ({ page, type }) => ({
        url: `service/viewFaqServices?type=${type}&page=${page}&limit=5`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['FAQAPI'],
    }),

    getFaqAdmin: build.query({
      query: ({ page, search, role }) => ({
        url: `/admin/viewFaq/${role}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['FAQAPI'],
    }),

    addFaq: build.mutation({
      query: ({ role, data }) => {
        return {
          url: `/admin/addFaq/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['FAQAPI'],
    }),

    editFaq: build.mutation({
      query: ({ id, role, data }) => {
        return {
          url: `/admin/updateFaq/${id}/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['FAQAPI'],
    }),

    deleteFaq: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteFaq/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['FAQAPI'],
    }),
    getFaqSections: build.query({
      query: ({ role }) => ({
        url: `/admin/viewFaqSubtitles/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['FAQAPI'],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqParticularQuery,
  useEditFaqMutation,
  useGetFaqAdminQuery,
  useGetFaqQuery,
  useGetFaqSectionsQuery,
} = FaqAPi;
