import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './CustomFetchBase';

export const UserCartApi = createApi({
  reducerPath: 'UserCartApi',
  baseQuery: customFetchBase,
  tagTypes: ['USERCARTAPI'],
  endpoints: (build) => ({
    getCart: build.query({
      query: ({ currentPage, phoneNumber }) => ({
        url: `/user/myCart/${phoneNumber}?page=${currentPage}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      providesTags: ['USERCARTAPI'],
    }),

    addRepairCart: build.mutation({
      query: ({ data }) => ({
        url: '/service/repairCart',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
    addCartLocalData: build.mutation({
      query: ({ data }) => ({
        url: '/service/addCart',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
    removeCart: build.mutation({
      query: ({ cartId, productId }) => ({
        url: `/user/removeCart/${cartId}/${productId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
    updateCart: build.mutation({
      query: ({ cartId, productId, data }) => ({
        url: `/user/updateCart/${cartId}/${productId}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
    addRefurbishedCart: build.mutation({
      query: ({ data }) => ({
        url: '/service/refurbishedCart',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
    addRetalCart: build.mutation({
      query: ({ data }) => ({
        url: '/service/rentalCart',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
    cartCheckout: build.mutation({
      query: ({ id, data }) => ({
        url: `/service/addQuote/${id}`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
    verifyCoupon: build.mutation({
      query: ({ data }) => ({
        url: `/service/verifyCoupon`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['USERCARTAPI'],
    }),
  }),
});

export const {
  useAddRefurbishedCartMutation,
  useAddRepairCartMutation,
  useAddRetalCartMutation,
  useGetCartQuery,
  useRemoveCartMutation,
  useCartCheckoutMutation,
  useVerifyCouponMutation,
  useUpdateCartMutation,
  useAddCartLocalDataMutation,
} = UserCartApi;
