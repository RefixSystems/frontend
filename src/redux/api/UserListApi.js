import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const UserListApi = createApi({
  reducerPath: 'UserListApi',
  baseQuery: customFetchBase,
  tagTypes: ['USERLIST'],
  endpoints: (build) => ({
    getUserList: build.query({
      query: ({ page, search, role ,phoneNumber}) => ({
        url: `/admin/viewUsers/${role}/${phoneNumber}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['USERLIST'],
    }),

    deleteUserList: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/deleteUser/${id}/${role}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERLIST'],
    }),
  }),
});

export const { useGetUserListQuery, useDeleteUserListMutation } = UserListApi;
