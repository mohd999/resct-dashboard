// features/auth/authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
  }),  
});
export const {
  useGetUserQuery,
} = userApi;