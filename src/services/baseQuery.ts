// services/api.ts
import { fetchBaseQuery, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { RootState } from '../app/store';
import { setCredentials, logout } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include', // send cookies
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to refresh the token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult.data) {
      const newToken = (refreshResult.data as any).accessToken;
      const refreshToken = (refreshResult.data as any).refreshToken;
      Cookies.set('accessToken', newToken, { path: '/', expires: 1 / 96 }); // 15 min  
      Cookies.set('refreshToken', refreshToken, { path: '/', expires: 1 / 96 }); // 15 min  
      // store new credentials
      api.dispatch(setCredentials(newToken));

      // retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // logout if refresh fails
      api.dispatch(logout());
    }
  }

  return result;
};
