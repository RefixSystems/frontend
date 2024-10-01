import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const CategoriesApi = createApi({
    reducerPath: "CategoriesApi",
    baseQuery: customFetchBase,
    tagTypes: ["CATEGORIESAPI"],
    endpoints: (build) => ({
      getCategories: build.query({
        query: ({page,search,role}) => ({
          url: `/admin/viewCategories/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["CATEGORIESAPI"],
      }),
     
      editCategories: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateCategory/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["CATEGORIESAPI"],
      }),
      
     
      addCategories: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addCategory/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["CATEGORIESAPI"],
      }),
      
     
      deleteCategories: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteCategory/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["CATEGORIESAPI"],
      }),
    }),
  });


export const { useGetCategoriesQuery,useEditCategoriesMutation,useDeleteCategoriesMutation,useAddCategoriesMutation} = CategoriesApi;
