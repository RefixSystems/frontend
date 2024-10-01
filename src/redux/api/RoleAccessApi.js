import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const RoleAccessApi = createApi({
  reducerPath: 'RoleAccessApi',
  baseQuery: customFetchBase,
  tagTypes: ['ROLEACCESSAPI'],
  endpoints: (build) => ({
    getRoleAccess: build.query({
      query: ({ selectedRole, role }) => ({
        url: `/admin/viewModuleAccess/${selectedRole}/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ROLEACCESSAPI'],
    }),

    getRole: build.query({
      query: ({ role }) => ({
        url: `admin/viewRoles/${role}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['ROLEACCESSAPI'],
    }),

    editRoleAccess: build.mutation({
      query: ({ selectedRole, id, data, role }) => ({
        url: `/admin/updateModuleAccess/${selectedRole}/${role}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ROLEACCESSAPI'],
    }),
  }),
});

export const {
  useGetRoleAccessQuery,
  useEditRoleAccessMutation,
  useGetRoleQuery,
} = RoleAccessApi;
