import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";



export const AccessApi = createApi({
  reducerPath: "Access",
  baseQuery: customFetchBase,
  tagTypes: ["ACCESS"],
  endpoints: (builder) => ({
    getAccess: builder.query({
      query: ({role,module,action}) => ({
        url: `/admin/verifyAccess?role=${role}&module=${module}&action=${action}`,
        method: "GET",
        // body:{role:"Admin",module:"transaction",action:"fullAccess"},
      
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["ACCESS"],
    }),


  
  }),
});

export const { useGetAccessQuery} = AccessApi;
