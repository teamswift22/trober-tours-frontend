import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, setUser } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL || 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReath = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log('no token');
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReath,
  tagTypes: ['User'],
  endpoints: builder => ({}),
});
