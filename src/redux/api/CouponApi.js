import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const CouponApi = createApi({
    reducerPath: "CouponApi",
    baseQuery: customFetchBase,
    tagTypes: ["COUPONAPI"],
    endpoints: (build) => ({
      getCoupon: build.query({
        query: ({page,search,role}) => ({
          url: `/admin/viewCoupons/${role}/${search}?page=${page}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["COUPONAPI"],
      }),
     
      getCouponById: build.query({
        query: ({id ,role}) => ({
          url: `/admin/viewCouponById/${id}/${role}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["COUPONAPI"],
      }),

      getCategory: build.query({
        query: () => ({
          url: `/admin/getCategory`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        providesTags: ["COUPONAPI"],
      }),

      editCoupon: build.mutation({
        query: ({ id,role,data }) => {
           return {
            url: `/admin/updateCoupon/${id}/${role}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["COUPONAPI"],
      }),
      
     
      addCoupon: build.mutation({
        query: ({role,data}) => {
          return {
            url: `/admin/addCoupon/${role}`,
            method: "POST",
            body: data,
            headers: {
             
            },
          };
        },
        invalidatesTags: ["COUPONAPI"],
      }),
      
     
      deleteCoupon: build.mutation({
        query: ({id,role}) => ({
          url: `/admin/deleteCoupon/${id}/${role}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["COUPONAPI"],
      }),
    }),
  });


export const { useGetCouponQuery,useGetCategoryQuery,useEditCouponMutation,useDeleteCouponMutation,useAddCouponMutation,useGetCouponByIdQuery} = CouponApi;
