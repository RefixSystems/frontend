import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const UserCreationApi = createApi({
  reducerPath: 'UserCreationApi',
  baseQuery: customFetchBase,
  tagTypes: ['USERCREATIONAPI'],
  endpoints: (build) => ({
    getUserCreation: build.query({
      query: ({role,search,page,email}) => ({
        url: `/admin/viewEmployees/${role}/${search}?page=${page}&email=${email}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['USERCREATIONAPI'],
    }),

    getUserCreationById: build.query({
      query: ({ id, role }) => ({
        url: `/admin/viewEmployeeById/${id}/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['USERCREATIONAPI'],
    }),

    editUserCreation: build.mutation({
      query: ({ id, data, role }) => {
        return {
          url: `/admin/updateEmployee/${id}/${role}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['USERCREATIONAPI'],
    }),

    addUserCreation: build.mutation({
      query: ({ data, role }) => {
        return {
          url: `/admin/addEmployee/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['USERCREATIONAPI'],
    }),

    deleteUserCreation: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteEmployee/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCREATIONAPI'],
    }),
  }),
});

export const {
  useGetUserCreationQuery,
  useGetUserCreationByIdQuery,
  useEditUserCreationMutation,
  useDeleteUserCreationMutation,
  useAddUserCreationMutation,
} = UserCreationApi;
