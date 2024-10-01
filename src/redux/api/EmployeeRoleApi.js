import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const EmployeeRoleApi = createApi({
  reducerPath: 'EmployeeRoleApi',
  baseQuery: customFetchBase,
  tagTypes: ['EMPLOYEEROLEAPI'],
  endpoints: (build) => ({
    getEmployeeRole: build.query({
      query: ({ page, search, role }) => ({
        url: `/admin/viewEmployeeRoles/${role}/${search}?page=${page}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['EMPLOYEEROLEAPI'],
    }),

    addEmployeeRole: build.mutation({
      query: ({ data, role }) => {
        return {
          url: `/admin/addEmployeeRole/${role}`,
          method: 'POST',
          body: data,
          headers: {},
        };
      },
      invalidatesTags: ['EMPLOYEEROLEAPI'],
    }),
  }),
});

export const { useGetEmployeeRoleQuery, useAddEmployeeRoleMutation } =
  EmployeeRoleApi;
