// features/auth/authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: {refreshToken:refreshToken},
      }),
    }),
  }),  
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
} = authApi;